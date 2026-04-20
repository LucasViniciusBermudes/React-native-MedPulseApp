// Lista de opções para tipo de medicamento
// Usada geralmente em um Select (dropdown)
export const medicationTypeOptions = [

  // Cada item representa uma forma de administração do medicamento
  // label = texto exibido para o usuário
  // value = valor interno (padronizado, sem acento)

  { label: "Comprimido", value: "comprimido" }, // ex: cápsulas, tablets
  { label: "Líquido", value: "liquido" },       // ex: xaropes, soluções
  { label: "Injeção", value: "injecao" },       // ex: intramuscular, intravenosa
  { label: "Outro", value: "outro" },           // fallback para outros tipos
];