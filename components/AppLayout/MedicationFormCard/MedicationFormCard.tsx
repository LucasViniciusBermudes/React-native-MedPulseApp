import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../../../styles/AppLayoutStyles/adicionar.styles";
import { Select } from "../../ui/Select/Select";
import { medicationTypeOptions } from "../../../constants/medicationTypeOptions";

// Tipagem das props do componente
type Props = {
  medicationName: string; // Nome do medicamento
  setMedicationName: (value: string) => void; // Setter do nome

  dosage: string; // Dosagem (ex: 500mg)
  setDosage: (value: string) => void; // Setter da dosagem

  medicationType: string | null; // Tipo selecionado
  setMedicationType: (value: string | null) => void; // Setter do tipo

  medicationTypeOpen: boolean; // Estado de abertura do Select
  setMedicationTypeOpen: (value: boolean) => void;

  // Mensagens de erro (opcionais)
  medicationNameError?: string;
  dosageError?: string;
  medicationTypeError?: string;
};

export function MedicationFormCard({
  medicationName,
  setMedicationName,
  dosage,
  setDosage,
  medicationType,
  setMedicationType,
  medicationTypeOpen,
  setMedicationTypeOpen,
  medicationNameError,
  dosageError,
  medicationTypeError,
}: Props) {
  return (
    <View style={styles.card}>
      
      {/* ===== TÍTULO DO CARD ===== */}
      <Text style={styles.label}>Medicamento</Text>

      {/* ===== INPUT NOME ===== */}
      <TextInput
        value={medicationName}
        onChangeText={setMedicationName}
        placeholder="Ex: Paracetamol"
        placeholderTextColor="#A5AAB3"
        style={[
          styles.input,
          medicationNameError ? styles.inputError : null, // Aplica erro visual
        ]}
      />

      {/* ERRO DO NOME */}
      {medicationNameError ? (
        <Text style={styles.errorText}>{medicationNameError}</Text>
      ) : null}

      {/* ===== LINHA COM DOIS CAMPOS ===== */}
      <View style={styles.row}>
        
        {/* ===== CAMPO DOSAGEM ===== */}
        <View style={styles.halfField}>
          <Text style={styles.label}>Dosagem</Text>

          <TextInput
            value={dosage}
            onChangeText={setDosage}
            placeholder="Ex: 500mg"
            placeholderTextColor="#A5AAB3"
            style={[
              styles.input,
              dosageError ? styles.inputError : null, // Erro visual
            ]}
          />

          {/* ERRO DA DOSAGEM */}
          {dosageError ? (
            <Text style={styles.errorText}>{dosageError}</Text>
          ) : null}
        </View>

        {/* ===== CAMPO TIPO (SELECT) ===== */}
        <View style={styles.halfField}>
          <Text style={styles.label}>Tipo</Text>

          <Select
            open={medicationTypeOpen} // Estado aberto/fechado
            onOpenChange={setMedicationTypeOpen} // Controla abertura
            value={medicationType} // Valor selecionado
            onValueChange={setMedicationType} // Atualiza valor
            options={medicationTypeOptions} // Lista de opções
            placeholder="Selecione"
            style={[
              styles.selectInput,
              medicationTypeError ? styles.inputError : null, // Erro visual
            ]}
            zIndex={4000} // Controle de sobreposição
            zIndexInverse={500} // Ajuste para dropdown
          />

          {/* ERRO DO TIPO */}
          {medicationTypeError ? (
            <Text style={styles.errorText}>{medicationTypeError}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}