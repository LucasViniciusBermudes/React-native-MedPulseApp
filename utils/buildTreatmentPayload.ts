import type { FrequencyType } from "@/components/AppLayout/FrequencySelector/FrequencySelector";
import type { DurationType } from "@/components/AppLayout/TreatmentDurationCard/TreatmentDurationCard";

// Parâmetros necessários para construir o payload de um tratamento
type BuildTreatmentPayloadParams = {
  medicationName: string;
  dosage: string;
  medicationType: string | null;
  frequencyType: FrequencyType;       // "intervalo" ou "fixos"
  startTime: string;                  // Horário inicial no formato "HH:mm"
  intervalHours: string;              // Intervalo em horas (usado quando frequencyType === "intervalo")
  fixedTimes: string[];               // Horários fixos (usado quando frequencyType === "fixos")
  durationType: DurationType;         // "continuo" ou "periodo"
  startDate: string;                  // Data de início do tratamento
  durationDays: string;               // Quantidade de dias do tratamento (usado quando durationType === "periodo")
  endDateText?: string;               // Data de término formatada (opcional)
};

// Garante que números menores que 10 sejam exibidos com zero à esquerda (ex: 9 → "09")
function pad(value: number) {
  return String(value).padStart(2, "0");
}

// Converte um horário "HH:mm" em total de minutos desde meia-noite
function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Converte um total de minutos de volta para o formato "HH:mm",
// normalizando valores que ultrapassem 24h (ex: 1500min → "01:00")
function minutesToTime(totalMinutes: number) {
  const minutesInDay = 24 * 60;
  const normalized = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;

  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  return `${pad(hours)}:${pad(minutes)}`;
}

// Gera a lista de horários em que o medicamento deve ser tomado ao longo do dia,
// com base no tipo de frequência escolhido pelo usuário
function buildCalculatedTimes(params: {
  frequencyType: FrequencyType;
  startTime: string;
  intervalHours: string;
  fixedTimes: string[];
}) {
  const { frequencyType, startTime, intervalHours, fixedTimes } = params;

  // Se o usuário definiu horários fixos, retorna diretamente sem cálculo
  if (frequencyType === "fixos") {
    return fixedTimes;
  }

  const interval = Number(intervalHours);

  // Intervalo inválido: retorna apenas o horário inicial como fallback
  if (!interval || interval <= 0) {
    return [startTime];
  }

  const intervalMinutes = interval * 60;
  const startMinutes = timeToMinutes(startTime);

  const times: string[] = [];
  const seen = new Set<string>(); // Evita duplicatas causadas por intervalos que fecham um ciclo exato de 24h

  // Percorre as 24h a partir do horário inicial, adicionando um horário a cada intervalo
  for (
    let currentMinutes = startMinutes;
    currentMinutes < startMinutes + 24 * 60;
    currentMinutes += intervalMinutes
  ) {
    const formattedTime = minutesToTime(currentMinutes);

    // Interrompe se o horário já foi registrado (ciclo completo detectado)
    if (seen.has(formattedTime)) break;

    seen.add(formattedTime);
    times.push(formattedTime);
  }

  return times;
}

// Estrutura final do payload enviado para salvar ou processar um tratamento
export type TreatmentPayload = {
  medicationName: string;
  dosage: string;
  medicationType: string;
  calculatedTimes: string[];                    // Horários calculados para o dia
  simpleStartDate: string;                      // Data de início sem formatação complexa
  takenTimesByDate: Record<string, string[]>;   // Registro de doses tomadas por data (inicialmente vazio)
  frequency:
    | {
        type: "intervalo";
        startTime: string;
        intervalHours: number;
      }
    | {
        type: "fixos";
        fixedTimes: string[];
      };
  duration:
    | {
        type: "continuo";
        startDate: string;
      }
    | {
        type: "periodo";
        startDate: string;
        durationDays: number;
        endDate?: string;
      };
};

// Constrói o objeto TreatmentPayload a partir dos dados brutos do formulário,
// normalizando tipos e calculando os horários conforme a frequência selecionada
export function buildTreatmentPayload({
  medicationName,
  dosage,
  medicationType,
  frequencyType,
  startTime,
  intervalHours,
  fixedTimes,
  durationType,
  startDate,
  durationDays,
  endDateText,
}: BuildTreatmentPayloadParams): TreatmentPayload {
  // Calcula os horários do dia com base no tipo de frequência
  const calculatedTimes = buildCalculatedTimes({
    frequencyType,
    startTime,
    intervalHours,
    fixedTimes,
  });

  return {
    medicationName: medicationName.trim(),
    dosage: dosage.trim(),
    medicationType: medicationType ?? "", // Garante string mesmo quando null
    calculatedTimes,
    simpleStartDate: startDate,
    takenTimesByDate: {}, // Inicializado vazio; preenchido conforme o usuário registra doses

    // Monta o objeto de frequência de acordo com o tipo selecionado
    frequency:
      frequencyType === "intervalo"
        ? {
            type: "intervalo",
            startTime,
            intervalHours: Number(intervalHours),
          }
        : {
            type: "fixos",
            fixedTimes,
          },

    // Monta o objeto de duração de acordo com o tipo selecionado
    duration:
      durationType === "continuo"
        ? {
            type: "continuo",
            startDate,
          }
        : {
            type: "periodo",
            startDate,
            durationDays: Number(durationDays),
            endDate: endDateText,
          },
  };
}