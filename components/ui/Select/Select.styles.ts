// Importa o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Cria e exporta os estilos do componente Select (dropdown)
export const selectStyles = StyleSheet.create({

  // Container principal do select
  container: {
    position: "relative", 
    // Necessário para que elementos filhos com position: "absolute"
    // (como o dropdown) sejam posicionados em relação a este container
  },

  // Estilo do dropdown (lista de opções)
  dropdown: {
    position: "absolute", 
    // Permite que o dropdown "flutue" sobre outros elementos

    left: 0,  
    right: 0, 
    // Faz o dropdown ocupar toda a largura do container pai
  },
});