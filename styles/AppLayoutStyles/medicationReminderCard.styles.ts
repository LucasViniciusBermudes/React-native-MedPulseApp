import { StyleSheet } from "react-native";

// Criação dos estilos do componente
export const styles = StyleSheet.create({
  // Container principal (card)
  container: {
    backgroundColor: "#FFFFFF", // fundo branco
    borderRadius: 16, // cantos arredondados
    paddingVertical: 12, // espaçamento vertical interno
    paddingHorizontal: 12, // espaçamento horizontal interno
    marginBottom: 12, // espaço abaixo do card

    shadowColor: "#000", // cor da sombra (iOS)
    shadowOpacity: 0.12, // opacidade da sombra
    shadowRadius: 10, // suavidade da sombra
    shadowOffset: { width: 0, height: 4 }, // posição da sombra

    elevation: 5, // sombra no Android
  },

  // Linha horizontal padrão
  row: {
    flexDirection: "row", // layout em linha
    alignItems: "center", // alinhamento vertical
  },

  // Wrapper do ícone
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21, // deixa circular (metade do tamanho)
    backgroundColor: "#EEF2F7", // fundo do ícone
    alignItems: "center", // centraliza horizontal
    justifyContent: "center", // centraliza vertical
    marginRight: 12, // espaço à direita
  },

  // Área de conteúdo (texto)
  content: {
    flex: 1, // ocupa espaço restante
  },

  // Título principal
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B", // cor escura
  },

  // Subtítulo / descrição
  subtitle: {
    fontSize: 11,
    color: "#94A3B8", // cor mais clara
    marginTop: 4, // espaço acima
  },

  // Container de ações (botões à direita)
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12, // espaço à esquerda
  },

  // Botão individual de ação
  actionButton: {
    marginRight: 12, // espaço entre botões
  },

  // Container dos horários (chips)
  timesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // quebra linha se necessário
    marginTop: 12, // espaço acima
  },

  // Chip de horário
  timeChip: {
    borderWidth: 1, // borda
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999, // formato totalmente arredondado (pill)
    marginRight: 8,
    marginBottom: 8,
  },

  // Texto dentro do chip
  timeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});