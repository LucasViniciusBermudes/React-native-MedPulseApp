import { StyleSheet } from "react-native";

// Estilos do header (cabeçalho)
export const headerStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,     // Espaçamento vertical interno
    paddingHorizontal: 16,  // Espaçamento horizontal interno
    backgroundColor: "#FFFFFF", // Cor de fundo branca

    // ===== SOMBRA (iOS / Web) =====
    shadowColor: "#000", // Cor da sombra
    shadowOffset: {
      width: 0,  // Sem deslocamento horizontal
      height: 2, // Leve deslocamento vertical
    },
    shadowOpacity: 0.08, // Opacidade bem suave
    shadowRadius: 6,     // Difusão da sombra

    // ===== SOMBRA (ANDROID) =====
    elevation: 3, // Nível de elevação (simula sombra)
  },

  row: {
    flexDirection: "row",   // Elementos lado a lado
    alignItems: "center",   // Alinha verticalmente ao centro
    justifyContent: "center", // Centraliza horizontalmente
    gap: 10, // Espaçamento entre os elementos (RN moderno)
  },

  title: {
    fontSize: 28,   // Tamanho da fonte
    lineHeight: 28, // Altura da linha (alinha melhor verticalmente)
    fontWeight: "700", // Negrito
  },

  titlePrimary: {
    color: "#2A0F0F", // Cor principal do título (escuro)
  },

  titleHighlight: {
    color: "#CE2E2E", // Cor de destaque (vermelho)
  },

  icon: {
    width: 48,        // Largura do ícone
    height: 48,       // Altura do ícone
    resizeMode: "contain", // Mantém proporção sem cortar
  },
});