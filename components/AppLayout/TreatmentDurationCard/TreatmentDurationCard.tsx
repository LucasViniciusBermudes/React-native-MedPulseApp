import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../../styles/AppLayoutStyles/adicionar.styles";
import { DateInput } from "../../ui/DateInput/DateInput";
import { Feather, FontAwesome6 } from "@expo/vector-icons";

// Tipos possíveis de duração do tratamento
export type DurationType = "continuo" | "periodo";

// Tipagem das props do componente
type Props = {
  durationType: DurationType; // Tipo selecionado (contínuo ou período)
  setDurationType: (value: DurationType) => void; // Setter do tipo

  startDate: string; // Data de início
  setStartDate: (value: string) => void;
  startDateError?: string; // Erro da data de início

  durationDays: string; // Quantidade de dias (modo período)
  setDurationDays: (value: string) => void;
  durationDaysError?: string; // Erro da duração

  endDateText?: string; // Texto calculado da data final
};

export function TreatmentDurationCard({
  durationType,
  setDurationType,
  startDate,
  setStartDate,
  startDateError,
  durationDays,
  setDurationDays,
  durationDaysError,
  endDateText,
}: Props) {

  // ===== TRATA INPUT DE DIAS =====
  // Remove caracteres não numéricos e limita a 3 dígitos
  function handleChangeDurationDays(text: string) {
    setDurationDays(text.replace(/\D/g, "").slice(0, 3));
  }

  return (
    <View style={styles.card}>
      
      {/* ===== TÍTULO ===== */}
      <Text style={styles.label}>Duração do Tratamento</Text>

      {/* ===== BOTÕES DE SELEÇÃO ===== */}
      <View style={styles.row}>
        
        {/* BOTÃO USO CONTÍNUO */}
        <TouchableOpacity
          style={[
            styles.durationButton,
            durationType === "continuo" && styles.durationButtonActive, // Ativo
          ]}
          onPress={() => setDurationType("continuo")}
          activeOpacity={0.8}
        >
          {/* ÍCONE */}
          <FontAwesome6
            name="infinity"
            size={24}
            color={durationType === "continuo" ? "#6B3535" : "#98A2B3"}
          />

          {/* TEXTO */}
          <Text
            style={[
              styles.durationText,
              durationType === "continuo" && styles.durationTextActive,
            ]}
          >
            Uso Contínuo
          </Text>
        </TouchableOpacity>

        {/* BOTÃO POR PERÍODO */}
        <TouchableOpacity
          style={[
            styles.durationButton,
            durationType === "periodo" && styles.durationButtonActive, // Ativo
          ]}
          onPress={() => setDurationType("periodo")}
          activeOpacity={0.8}
        >
          {/* ÍCONE */}
          <FontAwesome6
            name="hourglass-empty"
            size={24}
            color={durationType === "periodo" ? "#6B3535" : "#98A2B3"}
          />

          {/* TEXTO */}
          <Text
            style={[
              styles.durationText,
              durationType === "periodo" && styles.durationTextActive,
            ]}
          >
            Por Período
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== DATA DE INÍCIO ===== */}
      <Text style={styles.smallLabel}>Data de início</Text>

      {/* INPUT DE DATA (COMPONENTE CUSTOM) */}
      <DateInput
        value={startDate}
        onChange={setStartDate}
        error={startDateError}
        icon={<Feather name="clock" size={20} color="#98A2B3" />}
      />

      {/* ERRO DATA INÍCIO */}
      {startDateError ? (
        <Text style={styles.errorText}>{startDateError}</Text>
      ) : null}

      {/* ===== MODO PERÍODO ===== */}
      {durationType === "periodo" && (
        <>
          {/* INPUT DE DURAÇÃO EM DIAS */}
          <Text style={styles.smallLabel}>Duração (dias)</Text>

          <TextInput
            value={durationDays}
            onChangeText={handleChangeDurationDays}
            placeholder="7"
            placeholderTextColor="#A5AAB3"
            keyboardType="numeric"
            style={[styles.input, durationDaysError ? styles.inputError : null]}
          />

          {/* ERRO DURAÇÃO */}
          {durationDaysError ? (
            <Text style={styles.errorText}>{durationDaysError}</Text>
          ) : null}

          {/* DATA FINAL CALCULADA */}
          {!!endDateText && (
            <Text style={styles.endDateText}>Termina em: {endDateText}</Text>
          )}
        </>
      )}
    </View>
  );
}