import React from "react";
import { View, Text, ScrollView } from "react-native";
import { homeStyles } from "../../../styles/AppLayoutStyles/home.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Hook global com os tratamentos
import { useTreatments } from "@/context/TreatmentContext";

// Componente que representa cada lembrete de medicamento
import { MedicationReminderCard } from "@/components/AppLayout/MedicationReminderCard/MedicationReminderCard";

import { useEffect, useState } from "react";

// Armazenamento local do dispositivo
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Função utilitária:
 * Pega o primeiro nome e formata (Primeira letra maiúscula)
 */
function getFirstName(name?: string) {
  if (!name) return "";

  const first = name.trim().split(" ")[0];

  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export default function HomeScreen() {
  // ===== CONTEXTO GLOBAL =====
  // treatments: lista de medicamentos
  // isHydrated: indica se os dados já foram carregados do storage
  // removeTreatment: remove um tratamento
  // markTimeAsTaken: marca um horário como tomado
  const { treatments, isHydrated, removeTreatment, markTimeAsTaken } =
    useTreatments();

  // ===== ESTADO LOCAL =====
  // Guarda o primeiro nome do usuário
  const [firstName, setFirstName] = useState("");

  // ===== CARREGAR PERFIL DO USUÁRIO =====
  useEffect(() => {
    async function loadProfile() {
      try {
        // Busca dados salvos localmente
        const stored = await AsyncStorage.getItem("@profile");

        if (stored) {
          const profile = JSON.parse(stored);

          // Extrai e formata o primeiro nome
          setFirstName(getFirstName(profile.fullName));
        }
      } catch (error) {
        console.log("Erro ao carregar perfil:", error);
      }
    }

    loadProfile();
  }, []);

  // ===== ESTADO DE CARREGAMENTO =====
  // Enquanto os dados do contexto não carregam
  if (!isHydrated) {
    return (
      <View style={homeStyles.container}>
        <Text style={homeStyles.title}>
          Olá{firstName ? `, ${firstName}` : ""} 👋
        </Text>

        <Text style={homeStyles.subtitle}>
          Carregando lembretes...
        </Text>
      </View>
    );
  }

  // ===== UI PRINCIPAL =====
  return (
    <View style={homeStyles.container}>
      {/* Saudação com nome */}
      <Text style={homeStyles.title}>
        Olá{firstName ? `, ${firstName}` : ""} 👋
      </Text>

      {/* ===== CASO NÃO TENHA TRATAMENTOS ===== */}
      {treatments.length === 0 ? (
        <>
          <Text style={homeStyles.subtitle}>
            Você completou tudo por hoje! 🎉
          </Text>

          <View style={homeStyles.card}>
            {/* Ícone ilustrativo */}
            <View style={homeStyles.iconBox}>
              <MaterialCommunityIcons
                name="pill"
                size={32}
                color="#64748B"
              />
            </View>

            {/* Texto principal */}
            <Text style={homeStyles.emptyText}>
              Sem lembretes para hoje.
            </Text>

            {/* Dica para o usuário */}
            <Text style={homeStyles.hintText}>
              Toque no + para adicionar
            </Text>
          </View>
        </>
      ) : (
        // ===== CASO TENHA TRATAMENTOS =====
        <>
          <Text style={homeStyles.subtitle}>
            Seus medicamentos
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingBottom: 24,
            }}
          >
            {/* Lista de lembretes */}
            {treatments.map((item) => (
              <MedicationReminderCard
                key={item.id}
                item={item}

                // Remove o tratamento
                onPressCancel={() => removeTreatment(item.id)}

                // Marca horário como tomado
                onPressCheck={(time) =>
                  markTimeAsTaken(item.id, time)
                }
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}