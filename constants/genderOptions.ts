// Lista de opções de gênero para uso em um Select (dropdown)
export const genderOptions = [

  // Cada objeto representa uma opção
  // label = texto exibido ao usuário
  // value = valor interno usado na aplicação

  {
    label: "Masculino",
    value: "masculino", // valor padronizado (útil para backend)
  },
  {
    label: "Feminino",
    value: "feminino",
  },
  {
    label: "Outro",
    value: "outro", // opção mais inclusiva
  },
  {
    label: "Prefiro não informar",
    value: "nao_informar", // evita acento no value (boa prática)
  },
];