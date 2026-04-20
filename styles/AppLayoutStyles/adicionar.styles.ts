import { StyleSheet } from "react-native";

// Criação do objeto de estilos do React Native
export const styles = StyleSheet.create({
  // Área segura da tela (status bar / notch)
  safeArea: {
    flex: 1,
    //backgroundColor: '#F3F3F3', // cor opcional de fundo (comentada)
  },

  // Container principal da tela
  container: {
    flex: 1,
    //backgroundColor: '#F3F3F3', // cor opcional (comentada)
  },

  // Conteúdo de ScrollView
  scrollContent: {
    paddingHorizontal: 10, // espaçamento lateral
    //paddingTop: 10, // topo (comentado)
    paddingBottom: 80, // espaço inferior (ex: evitar sobreposição com tab)
  },

  // Header da tela
  header: {
    flexDirection: "row", // layout horizontal
    alignItems: "center", // alinhamento vertical
    justifyContent: "space-between", // espaçamento entre itens
    marginBottom: 18, // margem inferior
    //paddingTop: 8, // opcional (comentado)
  },

  // Botão de voltar
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  // Ícone do botão de voltar
  backIcon: {
    fontSize: 24,
    color: "#574A4A",
    fontWeight: "500",
  },

  // Título do header
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#352323",
  },

  // Espaço vazio à direita (para balancear layout)
  headerRightPlaceholder: {
    width: 36,
  },

  // Card principal
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 }, // posição da sombra
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4, // sombra no Android
    zIndex: 10, // sobreposição
  },

  // Label padrão
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#731D1D",
    marginBottom: 8,
  },

  // Label menor/secundária
  smallLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#A5AAB3",
    marginBottom: 8,
  },

  // Input padrão
  input: {
    height: 48,
    backgroundColor: "#F5F6F8",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#1C2430",
    fontSize: 15,
  },

  // Input tipo select
  selectInput: {
    height: 48,
    backgroundColor: "#F5F6F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F5F6F8",
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  // Texto do select
  selectText: {
    color: "#631616",
    fontSize: 15,
    fontWeight: "500",
  },

  // Placeholder do select/input
  placeholderText: {
    color: "#9198A1",
    fontSize: 15,
  },

  // Botão com borda tracejada
  dashedButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#5B1F1F",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  // Texto do botão tracejado
  dashedButtonText: {
    color: "#5B1F1F",
    fontSize: 17,
    fontWeight: "700",
  },

  // Linha horizontal com espaçamento
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  // Campo ocupando metade do espaço
  halfField: {
    flex: 1,
  },

  // Wrapper de ícone no meio
  middleIconWrapper: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    marginTop: 24,
  },

  // Ícone de refresh
  refreshIcon: {
    fontSize: 20,
    color: "red",
  },

  // Controle segmentado (tipo toggle)
  segmented: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },

  // Botão dentro do segmented
  segmentButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Estado ativo do botão segmentado
  segmentButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  // Texto do segmented
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F868E",
  },

  // Texto ativo
  segmentTextActive: {
    color: "#3C1E1E",
  },

  // Container de horários fixos
  fixedTimeContainer: {
    marginBottom: 12,
  },

  // Linha de horário fixo
  fixedTimeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Label do horário
  fixedTimeLabelWrapper: {
    width: 70,
    marginRight: 8,
  },

  // Wrapper do input
  fixedTimeInputWrapper: {
    flex: 1,
  },

  // Input de horário
  fixedTimeInput: {
    flex: 1,
  },

  // Botão de remover horário
  fixedTimeRemoveButton: {
    width: 32,
    height: 48,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // Input com ícone
  inputWithIcon: {
    height: 48,
    backgroundColor: "#F5F6F8",
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  // Caixa de resultado calculado
  calculatedBox: {
    backgroundColor: "#DF9F9F",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },

  // Label do cálculo
  calculatedLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#744E4E",
    marginBottom: 6,
  },

  // Linha de tags de tempo
  timeTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // Tag individual
  timeTag: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A88E8E",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },

  // Texto da tag
  timeTagText: {
    fontSize: 13,
    color: "#705A5A",
  },

  // Botão de duração
  durationButton: {
    flex: 1,
    height: 82,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#C6B9B9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  // Estado ativo do botão de duração
  durationButtonActive: {
    backgroundColor: "#F5BDBD",
    borderColor: "#C46B6B",
  },

  // Ícone do botão de duração
  durationIcon: {
    fontSize: 24,
    color: "#666A72",
    marginBottom: 6,
  },

  // Texto da duração
  durationText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6E727A",
  },

  // Texto ativo da duração
  durationTextActive: {
    color: "#6B3535",
  },

  // Input de data
  dateInput: {
    height: 50,
    backgroundColor: "#F7F7F8",
    borderWidth: 1,
    borderColor: "#E0E3E7",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  // Ícone da data
  dateIcon: {
    fontSize: 15,
    color: "#7D8794",
    marginRight: 8,
  },

  // Texto da data
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#2B323C",
    fontWeight: "500",
  },

  // Ícone de calendário
  calendarIcon: {
    fontSize: 15,
    color: "#7D8794",
  },

  // Botão salvar
  saveButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#631616",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  // Ícone do botão salvar
  saveButtonIcon: {
    fontSize: 15,
    color: "#FFFFFF",
    marginRight: 8,
  },

  // Texto do botão salvar
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Barra inferior (tab)
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9EBEF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  // Item da tab
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Ícone da tab
  tabIcon: {
    fontSize: 18,
    color: "#8C8F96",
    marginBottom: 4,
  },

  // Texto da tab
  tabText: {
    fontSize: 12,
    color: "#8C8F96",
  },

  // Botão flutuante (FAB)
  fabButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#163B63",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -24,
  },

  // Ícone "+"
  fabPlus: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "400",
    lineHeight: 30,
  },

  // Texto de data final
  endDateText: {
    marginTop: -2,
    textAlign: "right",
    color: "#7C7C7C",
    fontSize: 14,
    fontWeight: "500",
  },

  // Estilo de erro em input
  inputError: {
    borderWidth: 1.5,
    borderColor: "#EF4444",
  },

  // Texto de erro
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 10,
  },

  // Dropdown de select
  selectDropdown: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop: 4,
  },
});