// Importa o módulo StyleSheet do React Native,
// usado para criar estilos de forma otimizada
import { StyleSheet } from "react-native";

// Cria e exporta um objeto de estilos
export const styles = StyleSheet.create({
  
  // Estilo do botão
  button: {
    backgroundColor: "#5F1E1E", // cor de fundo (um vermelho escuro)
    padding: 16,                // espaçamento interno (em todos os lados)
    borderRadius: 12,           // bordas arredondadas
    alignItems: "center",       // centraliza o conteúdo horizontalmente
    marginTop: 16,              // margem superior (espaço acima do botão)
  },

  // Estilo do texto dentro do botão
  buttonText: {
    color: "#fff",        // cor do texto (branco)
    fontWeight: "bold",   // deixa o texto em negrito
    fontSize: 14,         // tamanho da fonte
  },
});