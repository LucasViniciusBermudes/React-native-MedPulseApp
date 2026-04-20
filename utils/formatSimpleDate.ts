// Formata uma string "DD/MM/YYYY" para o padrão legível em pt-BR (ex: "20 de abr. de 2026"),
// retornando a string original como fallback se o formato for inválido
export function formatSimpleDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  // Retorna o valor original se alguma parte da data estiver ausente ou for zero
  if (!day || !month || !year) return dateString;

  // Mês é 0-indexed no construtor do Date
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}