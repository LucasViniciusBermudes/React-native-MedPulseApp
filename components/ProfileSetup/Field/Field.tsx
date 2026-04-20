import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Field.styles";

// Tipagem das props do componente
type Props = {
  label: string; // Texto do rótulo (ex: "Nome", "Email")
  error?: string; // Mensagem de erro opcional
  children: React.ReactNode; // Conteúdo interno (input, select, etc.)
};

// Componente reutilizável de campo de formulário
export function Field({ label, error, children }: Props) {
  return (
    <View style={styles.field}>
      
      {/* ===== LABEL ===== */}
      <Text style={styles.label}>{label}</Text>

      {/* ===== CONTEÚDO ===== */}
      {/* Aqui entra o input ou qualquer outro componente */}
      {children}

      {/* ===== ERRO ===== */}
      {/* Só renderiza se existir erro */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}