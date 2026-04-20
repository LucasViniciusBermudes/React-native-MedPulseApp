import { StyleSheet } from "react-native";

// Estilos de layout geral da aplicação
export const layoutsStyles = StyleSheet.create({
  // Estilo da tela principal
  screen: { 
    flex: 1, // ocupa toda a tela
    backgroundColor: "#FFFFFF" // fundo branco
  },

  // Conteúdo interno da tela
  content: {
    flex: 1, // ocupa o espaço restante
    paddingHorizontal: 16, // espaçamento lateral
    paddingTop: 16, // espaçamento superior
    paddingBottom: 50, // espaçamento inferior (ex: evitar sobreposição com footer/tab)
  },
});