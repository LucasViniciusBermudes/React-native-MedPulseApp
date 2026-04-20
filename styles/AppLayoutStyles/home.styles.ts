import { StyleSheet } from "react-native";

// Estilos da tela Home
export const homeStyles = StyleSheet.create({

  // Container principal (empilha os elementos com espaçamento)
  container: {
    gap: 8, // espaço entre os filhos
  },

  // Título principal da tela
  title: {
    fontSize: 22, // tamanho grande
    fontWeight: "800", // bem destacado (extra bold)
    color: "#2A0F0F", // cor escura (tom vinho/preto)
  },

  // Subtítulo (texto secundário)
  subtitle: {
    color: "#64748B", // cinza azulado
  },

  // Card vazio (estado sem conteúdo)
  card: {
    marginTop: 14, // espaço acima
    height: 260, // altura fixa
    borderWidth: 1,
    borderColor: "#E6EBF2",
    borderStyle: "dashed", // borda tracejada (indica "placeholder")
    borderRadius: 14,
    alignItems: "center", // centraliza horizontalmente
    justifyContent: "center", // centraliza verticalmente
    gap: 8, // espaço entre elementos internos
    backgroundColor: "#FFFFFF",
  },

  // Caixa do ícone dentro do card
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6EBF2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC", // leve contraste com o fundo
  },

  // Texto principal do estado vazio
  emptyText: {
    color: "#64748B", // cinza médio
  },

  // Texto de dica (menor e mais suave)
  hintText: {
    color: "#94A3B8", // cinza mais claro
    fontSize: 12, // menor que o texto principal
  },
});