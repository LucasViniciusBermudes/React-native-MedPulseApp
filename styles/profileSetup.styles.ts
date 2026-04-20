import { StyleSheet } from "react-native";

// Escala de espaçamento centralizada para manter consistência visual
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const styles = StyleSheet.create({
  // Container principal que ocupa toda a tela
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Área de conteúdo com padding e espaçamento entre filhos
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },

  // Título em destaque com fonte grande e negrito
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // Texto descritivo em cinza para hierarquia visual
  description: {
    color: "#666",
  },

  // Estilo do campo de seleção de gênero (altura fixa + borda arredondada)
  selectGender: {
    minHeight: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  // Estilo do campo de seleção de tipo sanguíneo (mesmo padrão do selectGender)
  selectBlood: {
    minHeight: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  // Container do dropdown aberto (sem altura fixa, apenas borda e arredondamento)
  selectDropdown: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
  },

  // Estilo aplicado sobre inputs com erro de validação (borda vermelha)
  inputError: {
    borderColor: "#D32F2F",
  },

  // Input com ícone interno: layout em linha com borda e altura fixa
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    overflow: "hidden", // Garante que o conteúdo não ultrapasse o arredondamento
  },

  // Input sem borda própria, usado dentro do inputWithIcon para ocupar o espaço restante
  inputNoBorder: {
    flex: 1,
    minWidth: 0, // Permite que o flex shrink funcione corretamente em layouts apertados
    borderWidth: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    maxWidth: "100%",
  },
});