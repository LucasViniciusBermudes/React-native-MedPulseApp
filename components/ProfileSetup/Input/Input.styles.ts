import { StyleSheet } from "react-native";

// Configuração base reutilizável para inputs
const control = {
  height: 44,     // Altura padrão dos campos
  radius: 10,     // Arredondamento das bordas
  border: "#DDD", // Cor padrão da borda
  paddingH: 12,   // Padding horizontal interno
};

export const styles = StyleSheet.create({
  
  // ===== INPUT PADRÃO =====
  input: {
    height: control.height, // Usa altura padrão
    borderWidth: 1,         // Borda visível
    borderColor: control.border, // Cor padrão da borda
    borderRadius: control.radius, // Bordas arredondadas
    paddingHorizontal: control.paddingH, // Espaçamento interno lateral
  },

  // ===== INPUT "LIMPO" (SEM BORDA) =====
  inputBare: {
    flex: 1,        // Ocupa o espaço disponível
    minWidth: 0,    // Evita overflow em layouts flex
    height: control.height,
    borderWidth: 0, // Remove borda
    paddingHorizontal: 0, // Remove padding lateral
    backgroundColor: "transparent", // Fundo transparente
  },

  // ===== ESTADO DE ERRO =====
  inputError: {
    borderColor: "#D32F2F", // Vermelho para indicar erro
  },
});