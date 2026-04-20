import { StyleSheet } from "react-native";

export const bottomBarStyles = StyleSheet.create({
  // ===== WRAPPER GERAL =====
  // Fica fixo no rodapé da tela
  wrap: {
    position: "absolute", // fixa na tela
    left: 0,
    right: 0,
    bottom: 0,
    //paddingBottom: 12, // opcional (espaço extra inferior)
    backgroundColor: "transparent", // permite ver conteúdo atrás
  },

  // ===== CONTAINER DA BARRA =====
  container: {
    height: 64,

    // borda superior leve
    borderWidth: 1,
    borderColor: "#E9EDF3",

    backgroundColor: "#FFFFFF",

    // layout horizontal dos itens
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    // ===== SOMBRA iOS =====
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4, // sombra projetada para cima
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // ===== SOMBRA ANDROID =====
    elevation: 10,
  },

  // ===== ITEM DE NAVEGAÇÃO =====
  navItem: {
    width: 70, // largura fixa por item
    alignItems: "center",
    justifyContent: "center",
    gap: 4, // espaço entre ícone e texto
  },

  // ===== TEXTO PADRÃO =====
  navLabel: {
    fontSize: 11,
    color: "#64748B", // cinza
  },

  // ===== TEXTO ATIVO =====
  navLabelActive: {
    color: "#0F172A", // mais escuro
    fontWeight: "700", // negrito
  },

  // ===== BOTÃO CENTRAL (FAB) =====
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32, // círculo perfeito

    backgroundColor: "#2A0F0F",

    alignItems: "center",
    justifyContent: "center",

    marginTop: -32, // faz o botão "subir" e ficar flutuante

    // borda branca ao redor (efeito recorte)
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  // ===== TEXTO DO FAB (ícone "+") =====
  fabLabel: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
});