import { ProfileSetupErrors } from "../components/ProfileSetup/ProfileSetupForm";

// Dados de entrada para a validação do perfil do usuário
type ValidateProfileData = {
  fullName: string;
  birthDate: string;
  gender: string | null;
  bloodType: string | null;
  height: string;
  weight: string;
};

// Remove espaços extras entre palavras e nas extremidades da string
const normalizeName = (s: string) => s.replace(/\s+/g, " ").trim();

// Valida todos os campos do formulário de perfil e retorna um objeto
// com as mensagens de erro encontradas (campos sem erro ficam ausentes)
export function validateProfile(data: ValidateProfileData): ProfileSetupErrors {
  const e: ProfileSetupErrors = {};

  const name = normalizeName(data.fullName);

  // NOME
  if (!name) {
    e.fullName = "Preencha o nome completo.";
  } else {
    const parts = name.split(" ").filter(Boolean);

    if (parts.length < 2) {
      e.fullName = "Informe nome e sobrenome.";
    } else if (name.length < 10) {
      e.fullName = "O nome deve ter no mínimo 10 caracteres.";
    }
  }

  // DATA DE NASCIMENTO
  const { birthDate } = data;

  if (!birthDate) {
    e.birthDate = "Informe a data de nascimento.";
  } else if (birthDate.length !== 10) {
    // Verifica se a string está completa no formato "DD/MM/YYYY"
    e.birthDate = "Data incompleta.";
  } else {
    const [day, month, year] = birthDate.split("/").map(Number);

    // Mês é 0-indexed no construtor do Date
    const date = new Date(year, month - 1, day);

    // Valida se o Date gerado bate com os valores originais,
    // evitando que datas inválidas como "31/02/2024" sejam aceitas silenciosamente
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValid) {
      e.birthDate = "Data inválida.";
    } else if (date.getTime() > Date.now()) {
      e.birthDate = "A data não pode ser no futuro.";
    } else {
      // Calcula a idade exata considerando se o aniversário já ocorreu no ano atual
      const today = new Date();

      let age = today.getFullYear() - year;
      const m = today.getMonth() - (month - 1);

      if (m < 0 || (m === 0 && today.getDate() < day)) {
        age--;
      }

      if (age < 13) {
        e.birthDate = "Você precisa ter pelo menos 13 anos.";
      }
    }
  }

  // GÊNERO
  if (!data.gender) e.gender = "Selecione o gênero.";

  // TIPO SANGUÍNEO
  if (!data.bloodType) e.bloodType = "Selecione o tipo sanguíneo.";

  // ALTURA
  if (!data.height) {
    e.height = "Preencha a altura.";
  } else {
    const h = Number(data.height);

    if (!Number.isFinite(h)) {
      e.height = "Altura inválida.";
    } else if (h < 50 || h > 250) {
      e.height = "Altura deve estar entre 50 e 250 cm.";
    }
  }

  // PESO
  if (!data.weight) {
    e.weight = "Preencha o peso.";
  } else {
    const w = Number(data.weight);

    if (!Number.isFinite(w)) {
      e.weight = "Peso inválido.";
    } else if (w < 20 || w > 400) {
      e.weight = "Peso deve estar entre 20 e 400 kg.";
    }
  }

  return e;
}