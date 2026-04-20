import { StyleSheet } from "react-native";

// Definição dos estilos
export const styles = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1, // ocupa toda a altura
  },

  // Conteúdo interno da tela
  content: {
    flex: 1,
    padding: 16, // espaçamento geral
  },

  // Título da página
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 18,
  },

  // Card principal (relatório)
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    minHeight: 320, // altura mínima
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  // Título dentro do card
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 14,
  },

  // Container do mock do relatório (simulação visual)
  reportMock: {
    marginTop: 8,
    gap: 14, // espaçamento entre elementos
  },

  // Mock de gráfico
  chartMock: {
    height: 110,
    borderRadius: 14,
    backgroundColor: "#EEF2F7",
  },

  // Linha de métricas
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },

  // Card de métrica individual
  metricCard: {
    flex: 1,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#F3F6FA",
  },

  // Linha simulada (texto/loading)
  lineMock: {
    height: 14,
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },

  // Linha simulada menor
  lineMockShort: {
    height: 14,
    width: "65%", // largura parcial
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },

  // Overlay (camada acima da tela)
  overlay: {
    ...StyleSheet.absoluteFillObject, // ocupa toda a tela
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245,247,250,0.35)", // fundo semi-transparente
    paddingBottom: 36, // ajuste vertical
  },

  // Camada de blur (efeito de fundo)
  blurLayer: {
    ...StyleSheet.absoluteFillObject, // cobre toda a tela
  },

  // Card do popup/modal
  popupCard: {
    width: "74%",
    maxWidth: 320, // limite máximo
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  // Círculo do ícone no popup
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31, // círculo
    backgroundColor: "#E85A5A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  // Título do popup
  popupTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 2,
  },

  // Subtítulo do popup (ex: alerta)
  popupSubtitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#E03838",
    letterSpacing: 0.7,
    marginBottom: 14,
    textTransform: "uppercase", // texto em caixa alta
  },

  // Descrição do popup
  popupDescription: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 17,
    marginBottom: 18,
    paddingHorizontal: 6,
  },

  // Botão principal
  button: {
    backgroundColor: "#631717",
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 20,
    minWidth: 156,
    alignItems: "center",
  },

  // Texto do botão
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});