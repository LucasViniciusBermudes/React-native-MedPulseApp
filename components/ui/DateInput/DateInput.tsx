// Importa tipos e hooks do React
import { ReactNode, useState } from "react";

// Importa componentes básicos do React Native
import { TextInput, View } from "react-native";

// Importa ícone padrão de calendário
import { Ionicons } from "@expo/vector-icons";

// Importa os estilos do componente
import { datePickerStyles as styles } from "./DateInput.styles";

/**
 * Tipagem das props do componente
 */
type Props = {
  value: string; // valor atual do input
  onChange: (value: string) => void; // função chamada ao alterar o valor
  error?: string; // erro externo vindo do componente pai

  minDate?: Date; // data mínima permitida
  maxDate?: Date; // data máxima permitida
  validate?: (date: Date) => string | null; // validação customizada

  minDateMessage?: string; // mensagem personalizada para data menor que o mínimo
  maxDateMessage?: string; // mensagem personalizada para data maior que o máximo

  icon?: ReactNode; // ícone customizado opcional
};

/**
 * Componente de input de data com:
 * - máscara DD/MM/AAAA
 * - validação de data válida
 * - validação de intervalo mínimo/máximo
 * - validação customizada
 */
export function DateInput({
  value,
  onChange,
  error: externalError,
  minDate,
  maxDate,
  validate,
  minDateMessage,
  maxDateMessage,
  icon,
}: Props) {
  // Estado interno para armazenar erros gerados dentro do próprio componente
  const [internalError, setInternalError] = useState("");

  // Verifica se existe erro externo ou interno
  const hasError = Boolean(externalError || internalError);

  /**
   * Formata o texto digitado para o padrão DD/MM/AAAA
   * Remove tudo que não for número
   */
  function formatDate(text: string) {
    const numbers = text.replace(/\D/g, "");

    // Até 2 números: ex. "12"
    if (numbers.length <= 2) return numbers;

    // Até 4 números: ex. "12/03"
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    // A partir de 5 números: ex. "12/03/2025"
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  }

  /**
   * Converte uma string no formato DD/MM/AAAA em objeto Date
   * Também valida se a data realmente existe
   * Ex.: 31/02/2025 deve ser inválida
   */
  function parseDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number);

    // Se faltar alguma parte da data, retorna null
    if (!day || !month || !year) return null;

    const date = new Date(year, month - 1, day);

    // Confirma se a data criada corresponde exatamente aos valores informados
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return isValid ? date : null;
  }

  /**
   * Normaliza a data para o início do dia (00:00:00)
   * Isso evita problemas ao comparar datas com horário diferente
   */
  function startOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Manipula a alteração do texto digitado
   * - aplica máscara
   * - atualiza o valor
   * - valida formato e regras da data
   */
  function handleChange(text: string) {
    const formatted = formatDate(text);

    // Envia o valor formatado para o componente pai
    onChange(formatted);

    // Enquanto a data não estiver completa, limpa erro interno
    if (formatted.length < 10) {
      setInternalError("");
      return;
    }

    // Converte a string em Date
    const parsedDate = parseDate(formatted);

    // Se a data não for válida, mostra erro
    if (!parsedDate) {
      setInternalError("Data inválida");
      return;
    }

    const normalizedDate = startOfDay(parsedDate);

    // Valida data mínima
    if (minDate && normalizedDate < startOfDay(minDate)) {
      setInternalError(minDateMessage || "Data menor que a permitida");
      return;
    }

    // Valida data máxima
    if (maxDate && normalizedDate > startOfDay(maxDate)) {
      setInternalError(maxDateMessage || "Data maior que a permitida");
      return;
    }

    // Executa validação customizada, se existir
    if (validate) {
      const customError = validate(normalizedDate);

      if (customError) {
        setInternalError(customError);
        return;
      }
    }

    // Se passou em tudo, limpa o erro interno
    setInternalError("");
  }

  return (
    // Container visual do input
    // Aplica borda de erro se houver erro interno ou externo
    <View style={[styles.inputWrapper, hasError && styles.inputWrapperError]}>
      {/* Usa ícone customizado se for passado.
          Caso contrário, usa o ícone padrão de calendário */}
      {icon ?? <Ionicons name="calendar-outline" size={20} color="#98A2B3" />}

      <TextInput
        value={value} // valor atual do input
        onChangeText={handleChange} // função chamada ao digitar
        placeholder="DD/MM/AAAA" // texto de exemplo
        placeholderTextColor="#999" // cor do placeholder
        keyboardType="numeric" // teclado numérico
        maxLength={10} // limite no formato DD/MM/AAAA
        style={styles.input} // estilo visual do input
      />
    </View>
  );
}