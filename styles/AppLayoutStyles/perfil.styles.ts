import { StyleSheet } from "react-native";

// Definição dos estilos da tela
export const styles = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1, // ocupa toda a altura disponível
  },

  // Conteúdo com padding
  content: {
    paddingHorizontal: 16, // espaçamento lateral
    paddingTop: 10, // topo
    paddingBottom: 28, // espaço inferior
  },

  // Estado centralizado (ex: loading ou vazio)
  centered: {
    flex: 1,
    alignItems: "center", // centraliza horizontalmente
    justifyContent: "center", // centraliza verticalmente
    backgroundColor: "#F3F3F3", // fundo cinza claro
  },

  // Texto quando não há conteúdo
  emptyText: {
    fontSize: 16,
    color: "#666", // cinza médio
    fontWeight: "500",
  },

  // Título da página
  pageTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#402C2C",
    marginBottom: 14,
  },

  // Card de perfil do usuário
  profileCard: {
    minHeight: 98,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row", // layout horizontal
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  // Círculo do avatar
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23, // círculo perfeito
    backgroundColor: "rgba(255,255,255,0.10)", // fundo semi-transparente
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  // Nome do perfil
  profileName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 4,
    maxWidth: "90%", // limita largura para evitar overflow
  },

  // Linha de metadados do perfil
  profileMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Texto de metadados (ex: idade, info extra)
  profileMetaText: {
    color: "#FAB8B8",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },

  // Título de seção
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8A8A8A",
    marginBottom: 10,
    marginTop: 4,
    letterSpacing: 0.6, // espaçamento entre letras
  },

  // Grid de cards de saúde
  healthGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // quebra linha
    justifyContent: "space-between",
    rowGap: 10, // espaçamento entre linhas
    marginBottom: 16,
  },

  // Card individual de saúde
  healthCard: {
    width: "47.7%", // quase metade (para 2 colunas com espaçamento)
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // Ícone circular roxo
  iconCirclePurple: {
    width: 40,
    height: 40,
    borderRadius: "50%", // ⚠️ tentativa de círculo (não é padrão RN)
    backgroundColor: "#F2E9FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  // Ícone circular vermelho
  iconCircleRed: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#FFEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  // Ícone circular azul
  iconCircleBlue: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  // Ícone circular laranja
  iconCircleOrange: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#FFF3E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  // Valor principal (ex: número de saúde)
  healthValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#223B53",
    lineHeight: 24,
  },

  // Unidade do valor (ex: kg, bpm)
  healthUnit: {
    fontSize: 11,
    color: "#98A2B3",
    fontWeight: "500",
  },

  // Label do indicador
  healthLabel: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "700",
    color: "#8A8A8A",
    letterSpacing: 0.4,
  },

  // Card de integração (ex: apps conectados)
  integrationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Lado esquerdo da integração
  integrationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Ícone da integração
  integrationIcon: {
    marginRight: 8,
  },

  // Texto da integração
  integrationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
  },

  // Badge/status da integração
  integrationBadge: {
    backgroundColor: "#EAEAEA",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  // Texto do badge
  integrationBadgeText: {
    fontSize: 10,
    color: "#8B8B8B",
    fontWeight: "600",
  },
});