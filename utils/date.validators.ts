// Retorna uma função de validação que verifica se uma data de nascimento
// corresponde a uma idade mínima, usada em validações de formulário
export function validateMinimumAge(minAge: number) {
  return (date: Date) => {
    const today = new Date();

    // Calcula a idade subtraindo o ano de nascimento do ano atual
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    // Desconta um ano se o aniversário ainda não ocorreu no ano atual
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    if (age < minAge) {
      return `Você precisa ter pelo menos ${minAge} anos`;
    }

    return null; // Retorna null quando a validação passa (sem erro)
  };
}