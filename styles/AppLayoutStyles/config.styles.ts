import { StyleSheet } from "react-native";

// Criação do objeto de estilos da tela
export const styles = StyleSheet.create({

  // Container principal da tela
  container: {
    flex: 1, // ocupa toda a altura disponível
    backgroundColor: "#F5F7FA", // cor de fundo geral (cinza claro)
  },

  // Conteúdo interno (geralmente usado com ScrollView)
  content: {
    padding: 16, // espaçamento interno
    paddingBottom: 40, // espaço extra no final (evita cortar conteúdo)
  },

  // Título da página
  pageTitle: {
    fontSize: 22, // tamanho do texto
    fontWeight: "700", // negrito
    marginBottom: 16, // espaço abaixo
    color: "#111827", // cor do texto (quase preto)
  },

  // Card padrão (bloco branco com sombra)
  card: {
    backgroundColor: "#FFF", // fundo branco
    borderRadius: 12, // cantos arredondados
    padding: 12, // espaçamento interno
    marginBottom: 12, // espaço entre cards
    elevation: 2, // sombra (Android)
  },

  // Item dentro do card (linha)
  item: {
    flexDirection: "row", // layout horizontal
    justifyContent: "space-between", // separa esquerda e direita
    alignItems: "center", // alinha verticalmente
    paddingVertical: 10, // espaçamento vertical
  },

  // Lado esquerdo do item (ícone + texto, por exemplo)
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // espaço entre elementos (React Native moderno)
  },

  // Texto/label do item
  label: {
    fontSize: 14,
    color: "#374151", // cinza escuro
  },

  // Botão de deletar (ação perigosa)
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#FEE2E2", // vermelho claro (alerta suave)
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8, // espaço entre ícone e texto
    alignItems: "center",
  },

  // Texto do botão de deletar
  deleteText: {
    color: "#EF4444", // vermelho forte
    fontWeight: "600",
  },

  // Texto de versão do app (rodapé)
  version: {
    textAlign: "center", // centralizado
    marginTop: 20,
    fontSize: 12,
    color: "#9CA3AF", // cinza claro
  },
});