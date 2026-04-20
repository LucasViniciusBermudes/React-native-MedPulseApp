// Importa funções e hooks do React
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Importa o AsyncStorage para persistir dados localmente no dispositivo
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importa o tipo base do payload de tratamento
import type { TreatmentPayload } from "@/utils/buildTreatmentPayload";

/**
 * Tipo completo de um tratamento salvo no app
 * Herda os campos de TreatmentPayload e adiciona:
 * - id único
 * - data de criação
 */
export type TreatmentItem = TreatmentPayload & {
  id: string;
  createdAt: string;
};

/**
 * Estrutura de dados que o contexto vai disponibilizar
 */
type TreatmentContextData = {
  treatments: TreatmentItem[]; // lista de tratamentos salvos
  addTreatment: (treatment: TreatmentPayload) => Promise<void>; // adiciona um tratamento
  removeTreatment: (id: string) => Promise<void>; // remove um tratamento pelo id
  markTimeAsTaken: (id: string, time: string, dateKey?: string) => Promise<void>; 
  // marca um horário como tomado para uma determinada data
  isHydrated: boolean; // indica se os dados já foram carregados do AsyncStorage
};

/**
 * Chave usada para salvar e recuperar os tratamentos no AsyncStorage
 */
const STORAGE_KEY = "@medpulse:treatments";

/**
 * Cria o contexto de tratamentos
 * Inicialmente undefined para obrigar o uso dentro do Provider
 */
const TreatmentContext = createContext<TreatmentContextData | undefined>(
  undefined,
);

/**
 * Gera a data atual no formato DD/MM/AAAA
 * Usada como chave para organizar horários tomados por dia
 */
function getTodayKey() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Provider do contexto de tratamentos
 * Envolve a aplicação (ou parte dela) para disponibilizar os dados globalmente
 */
export function TreatmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado que guarda a lista de tratamentos
  const [treatments, setTreatments] = useState<TreatmentItem[]>([]);

  // Estado que indica se o carregamento inicial do storage já terminou
  const [isHydrated, setIsHydrated] = useState(false);

  /**
   * Carrega os tratamentos salvos localmente ao montar o componente
   */
  useEffect(() => {
    async function loadTreatments() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsed: TreatmentItem[] = JSON.parse(stored);
          setTreatments(parsed);
        }
      } catch (error) {
        console.log("Erro ao carregar tratamentos:", error);
      } finally {
        // Marca que o estado já foi hidratado,
        // mesmo se der erro ao carregar
        setIsHydrated(true);
      }
    }

    loadTreatments();
  }, []);

  /**
   * Persiste a lista de tratamentos no AsyncStorage
   */
  async function persist(nextTreatments: TreatmentItem[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextTreatments));
    } catch (error) {
      console.log("Erro ao salvar tratamentos:", error);
    }
  }

  /**
   * Adiciona um novo tratamento
   * - completa takenTimesByDate caso não exista
   * - gera id único
   * - define createdAt
   * - salva no estado e no storage
   */
  async function addTreatment(treatment: TreatmentPayload) {
    const newTreatment: TreatmentItem = {
      ...treatment,
      takenTimesByDate: treatment.takenTimesByDate ?? {},
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const nextTreatments = [...treatments, newTreatment];
    setTreatments(nextTreatments);
    await persist(nextTreatments);
  }

  /**
   * Remove um tratamento pelo id
   */
  async function removeTreatment(id: string) {
    const nextTreatments = treatments.filter((item) => item.id !== id);
    setTreatments(nextTreatments);
    await persist(nextTreatments);
  }

  /**
   * Marca um horário como "tomado" para um tratamento específico
   * dentro de uma data específica
   *
   * Exemplo:
   * takenTimesByDate = {
   *   "20/04/2026": ["08:00", "20:00"]
   * }
   */
  async function markTimeAsTaken(
    id: string,
    time: string,
    dateKey = getTodayKey(),
  ) {
    const nextTreatments = treatments.map((item) => {
      // Mantém os outros tratamentos inalterados
      if (item.id !== id) return item;

      // Recupera os horários já tomados naquela data
      const currentTimes = item.takenTimesByDate?.[dateKey] ?? [];

      // Se o horário já foi marcado, não duplica
      if (currentTimes.includes(time)) {
        return item;
      }

      // Retorna o tratamento atualizado
      return {
        ...item,
        takenTimesByDate: {
          ...item.takenTimesByDate,
          [dateKey]: [...currentTimes, time],
        },
      };
    });

    setTreatments(nextTreatments);
    await persist(nextTreatments);
  }

  /**
   * Memoriza o valor do contexto
   * Evita recriações desnecessárias do objeto a cada render
   */
  const value = useMemo(
    () => ({
      treatments,
      addTreatment,
      removeTreatment,
      markTimeAsTaken,
      isHydrated,
    }),
    [treatments, isHydrated],
  );

  /**
   * Fornece os dados e funções do contexto para os componentes filhos
   */
  return (
    <TreatmentContext.Provider value={value}>
      {children}
    </TreatmentContext.Provider>
  );
}

/**
 * Hook customizado para consumir o contexto de tratamentos
 */
export function useTreatments() {
  const context = useContext(TreatmentContext);

  // Garante que o hook só seja usado dentro do provider
  if (!context) {
    throw new Error("useTreatments precisa estar dentro de TreatmentProvider");
  }

  return context;
}