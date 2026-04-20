import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import type { TreatmentItem } from "@/context/TreatmentContext";
import { styles } from "../../../styles/AppLayoutStyles/medicationReminderCard.styles";

// Tipagem das props do componente
type Props = {
  item: TreatmentItem; // Item do tratamento/remédio
  onPressCancel?: () => void; // Ação ao cancelar/remover
  onPressCheck?: (time: string) => void; // Ação ao marcar horário como tomado
};

// Tipos possíveis de status de cada horário
type TimeStatus = "taken" | "missed" | "active" | "upcoming" | "soon";

// Limite para considerar que um horário está "próximo"
const SOON_THRESHOLD = 15;

// Janela de tempo para considerar que o horário está "ativo"
const ACTIVE_WINDOW = 15;

// ===== CONVERTE HORÁRIO PARA MINUTOS =====
// Ex: "08:30" => 510
function timeToMinutes(time: string) {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);

  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

// ===== GERA A CHAVE DA DATA ATUAL =====
// Formato: dd/mm/yyyy
function getTodayKey() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

// ===== DEFINE ÍCONE COM BASE NO TIPO DE MEDICAMENTO =====
function getMedicationIcon(type?: string) {
  const normalized = (type ?? "").toLowerCase();

  if (
    normalized.includes("comprimido") ||
    normalized.includes("capsula") ||
    normalized.includes("cápsula")
  ) {
    return <MaterialCommunityIcons name="pill" size={22} color="#64748B" />;
  }

  if (
    normalized.includes("liquido") ||
    normalized.includes("líquido") ||
    normalized.includes("xarope")
  ) {
    return (
      <MaterialCommunityIcons name="bottle-tonic" size={22} color="#64748B" />
    );
  }

  if (normalized.includes("inje")) {
    return <MaterialCommunityIcons name="needle" size={22} color="#64748B" />;
  }

  if (normalized.includes("gota")) {
    return <FontAwesome5 name="tint" size={18} color="#64748B" />;
  }

  if (normalized.includes("pomada") || normalized.includes("creme")) {
    return <MaterialCommunityIcons name="lotion" size={22} color="#64748B" />;
  }

  // Ícone padrão
  return <MaterialCommunityIcons name="pill" size={22} color="#64748B" />;
}

// ===== OBTÉM HORÁRIOS SEGUROS DO ITEM =====
// Prioriza calculatedTimes, depois fixedTimes, depois startTime
function getSafeTimes(item: TreatmentItem) {
  if (Array.isArray(item?.calculatedTimes) && item.calculatedTimes.length > 0) {
    return item.calculatedTimes.filter(
      (time) => typeof time === "string" && time.includes(":"),
    );
  }

  if (item?.frequency?.type === "fixos") {
    return (item.frequency.fixedTimes ?? []).filter(
      (time) => typeof time === "string" && time.includes(":"),
    );
  }

  if (item?.frequency?.type === "intervalo" && item.frequency.startTime) {
    return [item.frequency.startTime];
  }

  return [];
}

// ===== EXPANDE HORÁRIOS PARA LIDAR COM VIRADA DE DIA =====
// Exemplo: 22:00, 02:00 vira uma sequência crescente em minutos
function expandTimes(times: string[]) {
  const timesWithMinutes = times
    .map((time) => ({
      time,
      minutes: timeToMinutes(time),
    }))
    .filter((t): t is { time: string; minutes: number } => t.minutes !== null);

  if (timesWithMinutes.length === 0) return [];

  return timesWithMinutes.map((item, index, array) => {
    if (index === 0) {
      return { ...item, expandedMinutes: item.minutes };
    }

    let expandedMinutes = item.minutes;
    let prevExpanded = array[0].minutes;

    for (let i = 1; i < index; i++) {
      let next = array[i].minutes;
      while (next <= prevExpanded) next += 24 * 60;
      prevExpanded = next;
    }

    while (expandedMinutes <= prevExpanded) {
      expandedMinutes += 24 * 60;
    }

    return { ...item, expandedMinutes };
  });
}

// ===== MONTA MAPA DE STATUS DOS HORÁRIOS =====
function getTimeStatusMap(item: TreatmentItem) {
  const times = getSafeTimes(item);
  const todayKey = getTodayKey();
  const takenTimes = item.takenTimesByDate?.[todayKey] ?? [];
  const statusMap: Record<string, TimeStatus> = {};

  if (times.length === 0) return statusMap;

  const expanded = expandTimes(times);
  if (expanded.length === 0) return statusMap;

  const now = new Date();
  const nowMinutesRaw = now.getHours() * 60 + now.getMinutes();

  const firstExpanded = expanded[0].expandedMinutes;
  let nowExpanded = nowMinutesRaw;

  // Ajusta o horário atual se estiver "antes demais"
  // para comparações com horários que atravessam meia-noite
  if (nowExpanded < firstExpanded - SOON_THRESHOLD) {
    nowExpanded += 24 * 60;
  }

  expanded.forEach((entry) => {
    const { time, expandedMinutes } = entry;
    const isTaken = takenTimes.includes(time);

    // Se já foi tomado hoje
    if (isTaken) {
      statusMap[time] = "taken";
      return;
    }

    const diff = expandedMinutes - nowExpanded;

    // Ainda está longe
    if (diff > SOON_THRESHOLD) {
      statusMap[time] = "upcoming";
      return;
    }

    // Está próximo do horário
    if (diff > 0 && diff <= SOON_THRESHOLD) {
      statusMap[time] = "soon";
      return;
    }

    // Está no intervalo ativo
    if (diff <= 0 && diff >= -ACTIVE_WINDOW) {
      statusMap[time] = "active";
      return;
    }

    // Já passou do horário
    statusMap[time] = "missed";
  });

  return statusMap;
}

// ===== DEFINE COR BASEADA NO STATUS =====
function getTimeColor(status: TimeStatus) {
  switch (status) {
    case "taken":
      return "#22C55E";
    case "missed":
      return "#EF4444";
    case "active":
      return "#2563EB";
    case "soon":
      return "#EAB308";
    default:
      return "#94A3B8";
  }
}

export function MedicationReminderCard({
  item,
  onPressCancel,
  onPressCheck,
}: Props) {
  // Estado usado só para forçar re-render a cada minuto
  const [, setNowTick] = useState(0);

  // ===== ATUALIZA O CARD A CADA 1 MINUTO =====
  // Isso garante que os status dos horários mudem automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setNowTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Lista de horários válidos
  const times = getSafeTimes(item);

  // Mapa memoizado com status dos horários
  const statusMap = useMemo(() => getTimeStatusMap(item), [item]);

  // Primeiro horário que pode ser marcado como tomado
  // Só permite "soon" ou "active"
  const firstCheckableTime =
    times.find(
      (time) =>
        statusMap[time] === "soon" || statusMap[time] === "active",
    ) ?? null;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* ===== ÍCONE DO MEDICAMENTO ===== */}
        <View style={styles.iconWrapper}>
          {getMedicationIcon(item?.medicationType)}
        </View>

        {/* ===== CONTEÚDO PRINCIPAL ===== */}
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.medicationName ?? "Medicamento"} {item?.dosage ?? ""}
          </Text>

          <Text style={styles.subtitle}>
            Início: {item?.simpleStartDate ?? "-"}
          </Text>
        </View>

        {/* ===== AÇÕES ===== */}
        <View style={styles.actions}>
          {/* Botão de cancelar/remover */}
          <TouchableOpacity onPress={onPressCancel} style={styles.actionButton}>
            <Feather name="x-circle" size={20} color="#A1A1AA" />
          </TouchableOpacity>

          {/* Botão de confirmar/tomar */}
          <TouchableOpacity
            onPress={() => {
              if (firstCheckableTime && onPressCheck) {
                onPressCheck(firstCheckableTime);
              }
            }}
            disabled={!firstCheckableTime}
          >
            <Feather
              name="check-circle"
              size={22}
              color={firstCheckableTime ? "#2563EB" : "#CBD5E1"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== LISTA DE HORÁRIOS ===== */}
      <View style={styles.timesContainer}>
        {times.map((time, index) => {
          const status = statusMap[time] ?? "upcoming";
          const color = getTimeColor(status);

          return (
            <View
              key={`${time}-${index}`}
              style={[
                styles.timeChip,
                {
                  borderColor: color,
                  backgroundColor: `${color}12`,
                },
              ]}
            >
              <Text style={[styles.timeText, { color }]}>{time}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}