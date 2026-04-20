// Importa o StyleSheet do React Native para criar estilos otimizados
import { StyleSheet } from "react-native";

// Exporta os estilos do DatePicker
export const datePickerStyles = StyleSheet.create({

  // Container principal (envolve todo o componente)
  container: {
    width: "100%", // ocupa toda a largura disponível
  },

  // Wrapper do input (campo clicável com ícone + texto)
  inputWrapper: {
    flexDirection: "row",     // organiza os elementos em linha (horizontal)
    alignItems: "center",     // centraliza verticalmente os itens
    height: 45,               // altura fixa do campo
    borderWidth: 1,           // espessura da borda
    borderColor: "#DDD",      // cor padrão da borda (cinza claro)
    borderRadius: 10,         // bordas arredondadas
    paddingHorizontal: 12,    // espaçamento interno horizontal
    backgroundColor: "#FFF",  // fundo branco
    width: "100%",            // ocupa toda a largura do container
    minWidth: 0,              // evita overflow em layouts flex
  },

  // Estilo aplicado quando há erro (ex: validação)
  inputWrapperError: {
    borderColor: "#D32F2F", // borda vermelha indicando erro
  },

  // Estilo do campo de texto
  input: {
    flex: 1,             // ocupa todo o espaço restante dentro do wrapper
    minWidth: 0,         // evita quebra de layout em flexbox
    marginLeft: 8,       // espaço entre ícone e texto
    fontSize: 16,        // tamanho da fonte
    color: "#000",       // cor do texto (preto)
    paddingVertical: 0,  // remove padding vertical padrão (melhor alinhamento)
  },

  // Texto de erro exibido abaixo do input
  errorText: {
    color: "#D32F2F", // vermelho padrão para erros
  },
});