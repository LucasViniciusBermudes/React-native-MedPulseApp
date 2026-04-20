// Converte uma string no formato "DD/MM/YYYY" em um objeto Date,
// retornando null se a string for inválida ou representar uma data inexistente
export function parseDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  // Aborta se qualquer parte da data estiver ausente ou for zero
  if (!day || !month || !year) return null;

  // Cria a data (mês é 0-indexed no construtor do Date)
  const date = new Date(year, month - 1, day);

  // Valida se o Date gerado bate com os valores originais,
  // evitando que datas inválidas como "31/02/2024" sejam aceitas silenciosamente
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}

// Retorna uma cópia da data com o horário zerado (meia-noite),
// útil para comparações de datas sem interferência do horário
export function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}