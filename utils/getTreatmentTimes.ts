// Garante que números menores que 10 sejam exibidos com zero à esquerda (ex: 9 → "09")
function pad(value: number) {
  return String(value).padStart(2, "0");
}

// Converte um horário "HH:mm" em total de minutos desde meia-noite
function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Converte um total de minutos para o formato "HH:mm",
// normalizando valores negativos ou acima de 24h
function minutesToTime(totalMinutes: number) {
  const normalized = totalMinutes % (24 * 60);
  const safeMinutes = normalized < 0 ? normalized + 24 * 60 : normalized; // Corrige valores negativos

  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  return `${pad(hours)}:${pad(minutes)}`;
}

// Retorna a lista de horários do dia em que o medicamento deve ser tomado,
// calculando os intervalos a partir do horário inicial ou retornando os horários fixos diretamente
export function getTreatmentTimes(
  frequency:
    | {
        type: "intervalo";
        startTime: string;
        intervalHours: number;
      }
    | {
        type: "fixos";
        fixedTimes: string[];
      },
) {
  // Horários fixos: retorna diretamente sem nenhum cálculo
  if (frequency.type === "fixos") {
    return frequency.fixedTimes;
  }

  const startMinutes = timeToMinutes(frequency.startTime);
  const intervalMinutes = frequency.intervalHours * 60;

  // Intervalo inválido: retorna apenas o horário inicial como fallback
  if (!intervalMinutes || intervalMinutes <= 0) {
    return [frequency.startTime];
  }

  const times: string[] = [];
  const seen = new Set<string>(); // Evita duplicatas em intervalos que fecham ciclo exato de 24h

  // Percorre as 24h a partir do horário inicial, adicionando um horário a cada intervalo
  for (let current = startMinutes; current < startMinutes + 24 * 60; current += intervalMinutes) {
    const formatted = minutesToTime(current);

    // Interrompe se o horário já foi registrado (ciclo completo detectado)
    if (seen.has(formatted)) break;

    seen.add(formatted);
    times.push(formatted);
  }

  return times;
}