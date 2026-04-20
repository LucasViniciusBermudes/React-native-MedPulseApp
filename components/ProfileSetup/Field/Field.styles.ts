import { StyleSheet } from "react-native";

// Estilos reutilizáveis para campos de formulário
export const styles = StyleSheet.create({
  
  field: {
    flex: 1, // Ocupa todo o espaço disponível
    gap: 4,  // Espaçamento entre elementos internos (label, input, erro)
  },

  label: {
    fontSize: 12,   // Tamanho pequeno para labels
    color: "#777",  // Cor cinza suave
  },

  errorText: {
    color: "#D32F2F", // Vermelho para indicar erro
    fontSize: 12,     // Tamanho pequeno
    marginTop: 4,     // Espaço acima do erro
  },
});