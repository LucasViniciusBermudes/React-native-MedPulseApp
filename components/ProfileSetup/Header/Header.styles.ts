import { StyleSheet } from "react-native";

// Estilos do header (cabeçalho principal da tela)
export const styles = StyleSheet.create({
  
  header: {
    height: 260, // Altura fixa do header
    backgroundColor: "#E46E6E", // Cor de fundo (vermelho)

    borderBottomLeftRadius: 32,  // Arredondamento inferior esquerdo
    borderBottomRightRadius: 32, // Arredondamento inferior direito

    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center",     // Centraliza horizontalmente

    padding: 24, // Espaçamento interno
    overflow: "hidden", // Garante que elementos internos não ultrapassem bordas
  },

  watermark: {
    position: "absolute", // Posicionamento absoluto (fundo decorativo)
    width: 440,
    height: 440,
    opacity: 0.08, // Bem transparente
    top: -50,      // Desloca para cima
    right: -90,    // Desloca para direita
    resizeMode: "contain", // Mantém proporção da imagem
  },

  logo: {
    width: 100,  // Largura do logo
    height: 100, // Altura do logo
    marginBottom: 8, // Espaço abaixo do logo
    resizeMode: "contain", // Mantém proporção
  },

  appName: {
    fontSize: 22,      // Tamanho do nome do app
    fontWeight: "bold", // Negrito
    color: "#fff",     // Cor branca
  },

  subtitle: {
    fontSize: 14,   // Tamanho menor
    color: "#EAF6FB", // Cor mais suave (quase branco)
  },
});