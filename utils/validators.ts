import type { FrequencyType } from "@/components/AppLayout/FrequencySelector/FrequencySelector";
import type { DurationType } from "@/components/AppLayout/TreatmentDurationCard/TreatmentDurationCard";

// Converte uma string "DD/MM/YYYY" em um objeto Date,
// retornando null se a string for inválida ou representar uma data inexistente
export function parseDate(dateString: string) {
  const clean = dateString.replace(/\s/g, ""); // Remove espaços acidentais antes de processar
  const [day, month, year] = clean.split("/").map(Number);

  if (!day || !month || !year) return null;

  // Mês é 0-indexed no construtor do Date
  const date = new Date(year, month - 1, day);

  // Valida se o Date gerado bate com os valores originais,
  // evitando que datas inválidas como "31/02/2024" sejam aceitas silenciosamente
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}

// Formata um objeto Date para a string "DD/MM/YYYY"
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é 0-indexed, então soma 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Verifica se uma string está no formato "HH:MM" e representa um horário válido
export function isValidTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

// Estrutura de erros do formulário de tratamento
export type FormErrors = {
  medicationName: string;
  dosage: string;
  medicationType: string;
  startTime: string;
  intervalHours: string;
  fixedTimes: string[];          // Erros individuais por horário fixo
  fixedTimesGeneral: string;     // Erro geral da lista de horários fixos (ex: lista vazia)
  startDate: string;
  durationDays: string;
};

type ValidateFrequencyParams = {
  frequencyType: FrequencyType;
  startTime: string;
  intervalHours: string;
  fixedTimes: string[];
};

type ValidateDurationParams = {
  durationType: DurationType;
  startDate: string;
  durationDays: string;
};

type ValidateFormParams = {
  medicationName: string;
  dosage: string;
  medicationType: string | null;
  frequencyType: FrequencyType;
  startTime: string;
  intervalHours: string;
  fixedTimes: string[];
  durationType: DurationType;
  startDate: string;
  durationDays: string;
};

// Valida os campos de frequência do tratamento ("intervalo" ou "fixos")
export function validateFrequency({
  frequencyType,
  startTime,
  intervalHours,
  fixedTimes,
}: ValidateFrequencyParams) {
  const errors = {
    startTime: "",
    intervalHours: "",
    fixedTimes: [] as string[],
    fixedTimesGeneral: "",
  };

  if (frequencyType === "intervalo") {
    if (!startTime.trim()) {
      errors.startTime = "Informe o horário de início";
    } else if (!isValidTime(startTime)) {
      errors.startTime = "Digite um horário válido no formato HH:MM";
    }

    if (!intervalHours.trim()) {
      errors.intervalHours = "Informe o intervalo em horas";
    } else {
      const interval = Number(intervalHours);

      if (!Number.isInteger(interval) || interval <= 0) {
        errors.intervalHours = "O intervalo deve ser maior que 0";
      }
    }
  }

  if (frequencyType === "fixos") {
    // Retorna erro geral antes de validar individualmente se a lista estiver vazia
    if (fixedTimes.length === 0) {
      errors.fixedTimesGeneral = "Adicione pelo menos um horário";
      return errors;
    }

    // Detecta horários duplicados entre os válidos
    const validTimes = fixedTimes.filter((time) => isValidTime(time));
    const duplicatedTimes = new Set(
      validTimes.filter((time, index, array) => array.indexOf(time) !== index),
    );

    // Gera um erro individual para cada horário da lista
    errors.fixedTimes = fixedTimes.map((time) => {
      if (!time.trim()) return "Informe um horário válido";
      if (!isValidTime(time)) return "Digite um horário válido no formato HH:MM";
      if (duplicatedTimes.has(time)) return "Existem horários duplicados";
      return "";
    });
  }

  return errors;
}

// Valida os campos de duração do tratamento ("continuo" ou "periodo")
export function validateDuration({
  durationType,
  startDate,
  durationDays,
}: ValidateDurationParams) {
  const errors = {
    startDate: "",
    durationDays: "",
  };

  const parsedStartDate = parseDate(startDate);

  if (!parsedStartDate) {
    errors.startDate = "Informe uma data válida";
  }

  // Duração em dias só é obrigatória quando o tipo for "periodo"
  if (durationType === "periodo") {
    if (!durationDays.trim()) {
      errors.durationDays = "Informe a duração em dias";
    } else {
      const days = Number(durationDays);

      if (!Number.isInteger(days) || days <= 0) {
        errors.durationDays = "A duração deve ser maior que 0";
      }
    }
  }

  return errors;
}

// Valida os campos básicos do medicamento (nome, dosagem e tipo)
export function validateMedication({
  medicationName,
  dosage,
  medicationType,
}: Pick<ValidateFormParams, "medicationName" | "dosage" | "medicationType">) {
  return {
    medicationName: medicationName.trim()
      ? ""
      : "Informe o nome do medicamento",
    dosage: dosage.trim() ? "" : "Informe a dosagem",
    medicationType: medicationType ? "" : "Selecione o tipo do medicamento",
  };
}

// Valida o formulário completo, combinando os erros de medicamento, frequência e duração
export function validateForm(params: ValidateFormParams): FormErrors {
  const medicationErrors = validateMedication({
    medicationName: params.medicationName,
    dosage: params.dosage,
    medicationType: params.medicationType,
  });

  const frequencyErrors = validateFrequency({
    frequencyType: params.frequencyType,
    startTime: params.startTime,
    intervalHours: params.intervalHours,
    fixedTimes: params.fixedTimes,
  });

  const durationErrors = validateDuration({
    durationType: params.durationType,
    startDate: params.startDate,
    durationDays: params.durationDays,
  });

  return {
    medicationName: medicationErrors.medicationName,
    dosage: medicationErrors.dosage,
    medicationType: medicationErrors.medicationType,
    startTime: frequencyErrors.startTime,
    intervalHours: frequencyErrors.intervalHours,
    fixedTimes: frequencyErrors.fixedTimes,
    fixedTimesGeneral: frequencyErrors.fixedTimesGeneral,
    startDate: durationErrors.startDate,
    durationDays: durationErrors.durationDays,
  };
}

// Verifica se o objeto de erros contém ao menos um erro ativo,
// incluindo erros individuais dentro do array fixedTimes
export function hasFormErrors(errors: FormErrors) {
  return Boolean(
    errors.medicationName ||
      errors.dosage ||
      errors.medicationType ||
      errors.startTime ||
      errors.intervalHours ||
      errors.fixedTimesGeneral ||
      errors.fixedTimes.some(Boolean) ||
      errors.startDate ||
      errors.durationDays,
  );
}