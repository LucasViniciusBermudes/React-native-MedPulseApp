import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../../styles/AppLayoutStyles/adicionar.styles";
import { Feather } from "@expo/vector-icons";

// Tipos de frequência possíveis
export type FrequencyType = "intervalo" | "fixos";

// Tipagem das props do componente
type Props = {
  frequencyType: FrequencyType; // Tipo atual selecionado
  setFrequencyType: (value: FrequencyType) => void; // Setter do tipo

  startTime: string; // Hora inicial
  setStartTime: (value: string) => void;

  intervalHours: string; // Intervalo em horas
  setIntervalHours: (value: string) => void;

  fixedTimes: string[]; // Lista de horários fixos
  setFixedTimes: (value: string[]) => void;

  // Objeto de erros vindos do componente pai
  errors?: {
    startTime?: string;
    intervalHours?: string;
    fixedTimes?: string[];
    fixedTimesGeneral?: string;
  };

  // Função opcional para limpar erro de horário fixo específico
  clearFixedTimeError?: (index: number) => void;
};

// ===== NORMALIZA INPUT DE TEMPO =====
// Remove caracteres inválidos e formata para HH:mm
function normalizeTime(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 4);

  if (numbers.length === 0) return "";

  if (numbers.length === 1) {
    return numbers;
  }

  if (numbers.length === 2) {
    const hours = Number(numbers);

    // Bloqueia horas inválidas (>23)
    if (hours > 23) {
      return numbers.slice(0, 1);
    }

    return numbers;
  }

  if (numbers.length === 3) {
    const hours = Number(numbers.slice(0, 2));
    const minuteFirstDigit = Number(numbers[2]);

    if (hours > 23) {
      return numbers.slice(0, 1);
    }

    // Primeiro dígito do minuto não pode ser > 5
    if (minuteFirstDigit > 5) {
      return `${numbers.slice(0, 2)}:`;
    }

    return `${numbers.slice(0, 2)}:${numbers[2]}`;
  }

  const hours = Number(numbers.slice(0, 2));
  const minutes = Number(numbers.slice(2, 4));

  if (hours > 23) {
    return numbers.slice(0, 1);
  }

  if (minutes > 59) {
    return `${numbers.slice(0, 2)}:${numbers[2]}`;
  }

  return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
}

// ===== VALIDA FORMATO HH:mm =====
function isValidTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

// ===== ORDENA HORÁRIOS =====
function sortTimes(times: string[]) {
  return [...times].sort((a, b) => a.localeCompare(b));
}

// ===== GERA HORÁRIOS AUTOMATICAMENTE =====
function generateTimes(startTime: string, intervalHours: number) {
  if (!isValidTime(startTime) || !intervalHours || intervalHours <= 0) {
    return [];
  }

  const [hour, minute] = startTime.split(":").map(Number);
  const startMinutes = hour * 60 + minute;
  const intervalMinutes = intervalHours * 60;

  const times: string[] = [];
  let current = startMinutes;

  // Gera horários até 24h
  while (current < 24 * 60) {
    const h = Math.floor(current / 60);
    const m = current % 60;

    times.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    );

    current += intervalMinutes;
  }

  // Adiciona 00:00 se fechar exatamente o ciclo
  if (current === 24 * 60) {
    times.push("00:00");
  }

  return times;
}

export function FrequencySelector({
  frequencyType,
  setFrequencyType,
  startTime,
  setStartTime,
  intervalHours,
  setIntervalHours,
  fixedTimes,
  setFixedTimes,
  errors,
  clearFixedTimeError,
}: Props) {

  // ===== MEMO: HORÁRIOS CALCULADOS =====
  // Só recalcula quando startTime ou intervalHours mudam
  const calculatedTimes = useMemo(() => {
    if (!isValidTime(startTime)) return [];
    return generateTimes(startTime, Number(intervalHours));
  }, [startTime, intervalHours]);

  // ===== ADICIONA NOVO HORÁRIO FIXO =====
  const addFixedTime = () => {
    setFixedTimes([...fixedTimes, ""]);
  };

  // ===== REMOVE HORÁRIO FIXO =====
  const removeFixedTime = (index: number) => {
    const next = fixedTimes.filter((_, i) => i !== index);
    setFixedTimes(next);
  };

  // ===== ATUALIZA HORÁRIO FIXO =====
  const updateFixedTime = (index: number, value: string) => {
    const formatted = normalizeTime(value);
    const next = [...fixedTimes];
    next[index] = formatted;
    setFixedTimes(next);

    // Limpa erro daquele campo específico
    clearFixedTimeError?.(index);
  };

  // ===== VALIDAÇÃO (ON BLUR) =====
  const validateStartTimeOnBlur = () => {
    // Não faz nada diretamente
    // Validação é controlada pelo componente pai via "errors"
  };

  // ===== VALIDAÇÃO DE HORÁRIO FIXO =====
  const validateFixedTimeOnBlur = (index: number) => {
    const value = fixedTimes[index];

    if (!value) return;

    const validFilledTimes = fixedTimes.filter(isValidTime);
    const emptyTimes = fixedTimes.filter((item) => item === "");

    const filledTimes = fixedTimes.filter((item) => item !== "");
    const allFilledAreValid = filledTimes.every(isValidTime);

    // Ordena apenas se todos forem válidos
    if (allFilledAreValid) {
      const sortedValidTimes = sortTimes(validFilledTimes);
      setFixedTimes([...sortedValidTimes, ...emptyTimes]);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Frequência</Text>

      {/* ===== BOTÕES DE SELEÇÃO ===== */}
      <View style={styles.segmented}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            frequencyType === "intervalo" && styles.segmentButtonActive,
          ]}
          onPress={() => setFrequencyType("intervalo")}
        >
          <Text style={styles.segmentText}>Intervalo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentButton,
            frequencyType === "fixos" && styles.segmentButtonActive,
          ]}
          onPress={() => setFrequencyType("fixos")}
        >
          <Text style={styles.segmentText}>Horários Fixos</Text>
        </TouchableOpacity>
      </View>

      {/* ===== MODO INTERVALO ===== */}
      {frequencyType === "intervalo" ? (
        <>
          <View style={styles.row}>
            {/* INPUT INÍCIO */}
            <View style={styles.halfField}>
              <Text style={styles.smallLabel}>Início</Text>
              <TextInput
                value={startTime}
                onChangeText={(text) => {
                  const formatted = normalizeTime(text);
                  setStartTime(formatted);
                }}
                onBlur={validateStartTimeOnBlur}
                placeholder="08:00"
                placeholderTextColor="#A5AAB3"
                keyboardType="numeric"
                maxLength={5}
                style={[
                  styles.input,
                  errors?.startTime ? styles.inputError : null,
                ]}
              />
              {errors?.startTime ? (
                <Text style={styles.errorText}>{errors.startTime}</Text>
              ) : null}
            </View>

            {/* ÍCONE CENTRAL */}
            <View style={styles.middleIconWrapper}>
              <Text style={styles.refreshIcon}>↻</Text>
            </View>

            {/* INPUT INTERVALO */}
            <View style={styles.halfField}>
              <Text style={styles.smallLabel}>Repetir a cada</Text>
              <TextInput
                value={intervalHours}
                onChangeText={(text) =>
                  setIntervalHours(text.replace(/\D/g, "").slice(0, 2))
                }
                placeholder="8"
                placeholderTextColor="#A5AAB3"
                keyboardType="numeric"
                style={[
                  styles.input,
                  errors?.intervalHours ? styles.inputError : null,
                ]}
              />
              {errors?.intervalHours ? (
                <Text style={styles.errorText}>{errors.intervalHours}</Text>
              ) : null}
            </View>
          </View>

          {/* HORÁRIOS GERADOS */}
          <View style={styles.calculatedBox}>
            <Text style={styles.calculatedLabel}>Horários calculados:</Text>
            <View style={styles.timeTagsRow}>
              {calculatedTimes.length > 0 ? (
                calculatedTimes.map((time) => (
                  <View key={time} style={styles.timeTag}>
                    <Text style={styles.timeTagText}>{time}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.selectText}>
                  Informe início e intervalo.
                </Text>
              )}
            </View>
          </View>
        </>
      ) : (
        <>
          {/* ===== MODO HORÁRIOS FIXOS ===== */}
          {fixedTimes.map((time, index) => (
            <View key={index} style={styles.fixedTimeContainer}>
              <Text style={styles.smallLabel}>Horário {index + 1}</Text>

              <View style={styles.fixedTimeRow}>
                <TextInput
                  value={time}
                  onChangeText={(text) => updateFixedTime(index, text)}
                  onBlur={() => validateFixedTimeOnBlur(index)}
                  placeholder="08:00"
                  placeholderTextColor="#A5AAB3"
                  keyboardType="numeric"
                  maxLength={5}
                  style={[
                    styles.input,
                    styles.fixedTimeInput,
                    errors?.fixedTimes?.[index] ? styles.inputError : null,
                  ]}
                />

                <TouchableOpacity
                  style={styles.fixedTimeRemoveButton}
                  onPress={() => removeFixedTime(index)}
                >
                  <Feather name="x" size={28} color="red" />
                </TouchableOpacity>
              </View>

              {errors?.fixedTimes?.[index] ? (
                <Text style={styles.errorText}>{errors.fixedTimes[index]}</Text>
              ) : null}
            </View>
          ))}

          {/* ERRO GERAL */}
          {errors?.fixedTimesGeneral ? (
            <Text style={styles.errorText}>{errors.fixedTimesGeneral}</Text>
          ) : null}

          {/* BOTÃO ADICIONAR */}
          <TouchableOpacity style={styles.dashedButton} onPress={addFixedTime}>
            <Text style={styles.dashedButtonText}>+ Adicionar horário</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}