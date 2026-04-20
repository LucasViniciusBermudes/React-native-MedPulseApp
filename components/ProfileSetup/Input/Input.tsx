import React from "react";
import { TextInput } from "react-native";
import { styles } from "./Input.styles";

// Tipagem das props do componente
type Props = {
  value: string; // Valor do input
  onChangeText: (text: string) => void; // Função para atualizar valor
  placeholder?: string; // Placeholder opcional
  keyboardType?: "default" | "numeric"; // Tipo de teclado
  hasError?: boolean; // Indica erro (borda vermelha)
  style?: any; // Estilos adicionais externos
  bare?: boolean; // Define se o input é "limpo" (sem borda)
};

// Componente reutilizável de input
export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default", // Default é teclado padrão
  hasError,
  style,
  bare = false, // Default é false (input normal)
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF" // Cor do placeholder (cinza)
      keyboardType={keyboardType}

      // ===== ESTILOS DINÂMICOS =====
      style={[
        bare ? styles.inputBare : styles.input, // Escolhe estilo normal ou "bare"
        hasError ? styles.inputError : null,    // Aplica estilo de erro
        style, // Permite sobrescrever/estender estilos externamente
      ]}
    />
  );
}