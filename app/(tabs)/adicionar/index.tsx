import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../../../styles/AppLayoutStyles/adicionar.styles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

// Componentes de UI separados (boas práticas 👍)
import {
  FrequencySelector,
  FrequencyType,
} from "@/components/AppLayout/FrequencySelector/FrequencySelector";

import {
  TreatmentDurationCard,
  DurationType,
} from "@/components/AppLayout/TreatmentDurationCard/TreatmentDurationCard";

import { MedicationFormCard } from "@/components/AppLayout/MedicationFormCard/MedicationFormCard";

// Funções utilitárias (validação e manipulação de datas)
import {
  FormErrors,
  formatDate,
  parseDate,
  validateForm,
  hasFormErrors,
} from "../../../utils/validators";

// Função que monta o payload final do tratamento
import {
  buildTreatmentPayload,
  TreatmentPayload,
} from "../../../utils/buildTreatmentPayload";

// Hook global (context API)
import { useTreatments } from "@/context/TreatmentContext";

export default function Adicionar() {
  // Função global para salvar tratamento
  const { addTreatment } = useTreatments();

  // ===== ESTADOS DO FORMULÁRIO =====
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [medicationType, setMedicationType] = useState<string | null>(null);
  const [medicationTypeOpen, setMedicationTypeOpen] = useState(false);

  // Tipo de frequência (intervalo ou horários fixos)
  const [frequencyType, setFrequencyType] =
    useState<FrequencyType>("intervalo");

  // Tipo de duração (contínuo ou por período)
  const [durationType, setDurationType] =
    useState<DurationType>("continuo");

  // ===== CONFIGURAÇÕES DE FREQUÊNCIA =====
  const [startTime, setStartTime] = useState("08:00");
  const [intervalHours, setIntervalHours] = useState("8");
  const [fixedTimes, setFixedTimes] = useState<string[]>(["08:00"]);

  // ===== CONFIGURAÇÕES DE DURAÇÃO =====
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [durationDays, setDurationDays] = useState("7");

  // ===== ESTADO DE ERROS =====
  const [errors, setErrors] = useState<FormErrors>({
    medicationName: "",
    dosage: "",
    medicationType: "",
    startTime: "",
    intervalHours: "",
    fixedTimes: [],
    fixedTimesGeneral: "",
    startDate: "",
    durationDays: "",
  });

  // ===== CÁLCULO DA DATA FINAL =====
  // Só calcula se for tipo "período"
  const endDateText = useMemo(() => {
    if (durationType !== "periodo") return "";

    const parsedStartDate = parseDate(startDate);
    const days = Number(durationDays);

    // Validação básica
    if (!parsedStartDate || !days || days <= 0) return "";

    // Soma os dias na data inicial
    const endDate = new Date(parsedStartDate);
    endDate.setDate(endDate.getDate() + days - 1);

    return formatDate(endDate);
  }, [startDate, durationDays, durationType]);

  // ===== LIMPA ERRO DE UM HORÁRIO FIXO ESPECÍFICO =====
  function clearFixedTimeError(index: number) {
    setErrors((prev) => ({
      ...prev,
      fixedTimes: prev.fixedTimes.map((item, i) =>
        i === index ? "" : item,
      ),
      fixedTimesGeneral: "",
    }));
  }

  // ===== VALIDAÇÃO DO FORMULÁRIO =====
  function handleValidate() {
    const newErrors = validateForm({
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
    });

    setErrors(newErrors);

    // retorna true se NÃO houver erros
    return !hasFormErrors(newErrors);
  }

  // ===== SALVAR TRATAMENTO =====
  async function handleSave() {
    const isValid = handleValidate();

    if (!isValid) return; // para se tiver erro

    // Monta payload final
    const payload: TreatmentPayload = buildTreatmentPayload({
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
    });

    // Salva no contexto global
    await addTreatment(payload);

    // ===== RESET DO FORMULÁRIO =====
    setMedicationName("");
    setDosage("");
    setMedicationType(null);
    setFrequencyType("intervalo");
    setDurationType("continuo");
    setStartTime("08:00");
    setIntervalHours("8");
    setFixedTimes(["08:00"]);
    setStartDate(formatDate(new Date()));
    setDurationDays("7");

    // limpa erros
    setErrors({
      medicationName: "",
      dosage: "",
      medicationType: "",
      startTime: "",
      intervalHours: "",
      fixedTimes: [],
      fixedTimesGeneral: "",
      startDate: "",
      durationDays: "",
    });
  }

  // ===== UI =====
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Adicionar</Text>

            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* FORMULÁRIO DO MEDICAMENTO */}
          <MedicationFormCard
            medicationName={medicationName}
            setMedicationName={(value) => {
              setMedicationName(value);

              // limpa erro ao digitar
              if (errors.medicationName) {
                setErrors((prev) => ({
                  ...prev,
                  medicationName: "",
                }));
              }
            }}
            dosage={dosage}
            setDosage={(value) => {
              setDosage(value);
              if (errors.dosage) {
                setErrors((prev) => ({
                  ...prev,
                  dosage: "",
                }));
              }
            }}
            medicationType={medicationType}
            setMedicationType={(value) => {
              setMedicationType(value);
              if (errors.medicationType) {
                setErrors((prev) => ({
                  ...prev,
                  medicationType: "",
                }));
              }
            }}
            medicationTypeOpen={medicationTypeOpen}
            setMedicationTypeOpen={setMedicationTypeOpen}
            medicationNameError={errors.medicationName}
            dosageError={errors.dosage}
            medicationTypeError={errors.medicationType}
          />

          {/* FREQUÊNCIA */}
          <FrequencySelector
            frequencyType={frequencyType}
            setFrequencyType={(value) => {
              setFrequencyType(value);

              // reseta erros relacionados
              setErrors((prev) => ({
                ...prev,
                startTime: "",
                intervalHours: "",
                fixedTimes: [],
                fixedTimesGeneral: "",
              }));
            }}
            startTime={startTime}
            setStartTime={(value) => {
              setStartTime(value);
              if (errors.startTime) {
                setErrors((prev) => ({
                  ...prev,
                  startTime: "",
                }));
              }
            }}
            intervalHours={intervalHours}
            setIntervalHours={(value) => {
              setIntervalHours(value);
              if (errors.intervalHours) {
                setErrors((prev) => ({
                  ...prev,
                  intervalHours: "",
                }));
              }
            }}
            fixedTimes={fixedTimes}
            setFixedTimes={(value) => {
              setFixedTimes(value);

              // ajusta array de erros conforme tamanho
              setErrors((prev) => ({
                ...prev,
                fixedTimes: value.map(
                  (_, index) => prev.fixedTimes[index] ?? "",
                ),
                fixedTimesGeneral: "",
              }));
            }}
            errors={{
              startTime: errors.startTime,
              intervalHours: errors.intervalHours,
              fixedTimes: errors.fixedTimes,
              fixedTimesGeneral: errors.fixedTimesGeneral,
            }}
            clearFixedTimeError={clearFixedTimeError}
          />

          {/* DURAÇÃO */}
          <TreatmentDurationCard
            durationType={durationType}
            setDurationType={(value) => {
              setDurationType(value);

              // limpa erros relacionados
              setErrors((prev) => ({
                ...prev,
                startDate: "",
                durationDays: "",
              }));
            }}
            startDate={startDate}
            setStartDate={(value) => {
              setStartDate(value);
              if (errors.startDate) {
                setErrors((prev) => ({
                  ...prev,
                  startDate: "",
                }));
              }
            }}
            startDateError={errors.startDate}
            durationDays={durationDays}
            setDurationDays={(value) => {
              setDurationDays(value);
              if (errors.durationDays) {
                setErrors((prev) => ({
                  ...prev,
                  durationDays: "",
                }));
              }
            }}
            durationDaysError={errors.durationDays}
            endDateText={endDateText}
          />

          {/* BOTÃO SALVAR */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Entypo name="save" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}