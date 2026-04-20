import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// Armazenamento local
import AsyncStorage from "@react-native-async-storage/async-storage";

// Gradiente (UI)
import { LinearGradient } from "expo-linear-gradient";

// Ícones
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// Estilos
import { styles } from "../../../styles/AppLayoutStyles/perfil.styles";

// Card reutilizável de dados de saúde
import { HealthCard } from "../../../components/AppLayout/HealthCard/HealthCard";

// ===== TIPAGEM DO PERFIL =====
type ProfileData = {
  fullName: string;
  birthDate: string; // formato esperado: YYYY-MM-DD
  gender: string;
  bloodType: string;
  heightCm: number;
  weightKg: number;
};

// ===== FUNÇÃO: CAPITALIZAR NOME =====
// Ex: "joao da silva" -> "Joao da Silva"
function capitalizeName(name: string) {
  const exceptions = ["da", "de", "do", "dos", "das"];

  return name
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean) // remove espaços vazios
    .map((word) =>
      exceptions.includes(word)
        ? word
        : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");
}

// ===== FUNÇÃO: CALCULAR IDADE =====
function calculateAge(birthDate: string) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const today = new Date();

  let age = today.getFullYear() - year;

  // verifica se ainda não fez aniversário esse ano
  const hasNotHadBirthdayYet =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);

  if (hasNotHadBirthdayYet) age--;

  return age;
}

// ===== FUNÇÃO: CALCULAR IMC =====
function calculateBMI(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;

  if (!heightM || !weightKg) return "0.0";

  return (weightKg / (heightM * heightM)).toFixed(1);
}

export default function PerfilScreen() {
  // ===== ESTADOS =====
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== CARREGA PERFIL DO STORAGE =====
  useEffect(() => {
    async function loadProfile() {
      try {
        const stored = await AsyncStorage.getItem("@profile");

        if (stored) {
          const parsed: ProfileData = JSON.parse(stored);
          setProfile(parsed);
        }
      } catch (error) {
        console.log("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false); // sempre finaliza loading
      }
    }

    loadProfile();
  }, []);

  // ===== IDADE MEMORIZADA =====
  const age = useMemo(() => {
    if (!profile?.birthDate) return 0;
    return calculateAge(profile.birthDate);
  }, [profile]);

  // ===== IMC MEMORIZADO =====
  const bmi = useMemo(() => {
    if (!profile) return "0.0";
    return calculateBMI(profile.heightCm, profile.weightKg);
  }, [profile]);

  // ===== LOADING =====
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#891E1E" />
      </View>
    );
  }

  // ===== SEM PERFIL =====
  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhum perfil salvo.</Text>
      </View>
    );
  }

  // ===== UI PRINCIPAL =====
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* TÍTULO */}
      <Text style={styles.pageTitle}>Meu Perfil</Text>

      {/* ===== CARD DO PERFIL ===== */}
      <LinearGradient
        colors={["#DF2B2B", "#6B1414"]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}
      >
        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Feather name="user" size={24} color="#FAB8B8" />
        </View>

        {/* Nome e idade */}
        <View>
          <Text style={styles.profileName}>
            {capitalizeName(profile.fullName)}
          </Text>

          <View style={styles.profileMetaRow}>
            <Ionicons name="person-outline" size={12} color="#FAB8B8" />
            <Text style={styles.profileMetaText}>{age} anos</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ===== DADOS DE SAÚDE ===== */}
      <Text style={styles.sectionTitle}>DADOS DE SAÚDE</Text>

      <View style={styles.healthGrid}>
        <HealthCard type="imc" value={bmi} label="IMC" />

        <HealthCard
          type="blood"
          value={profile.bloodType}
          label="TIPO SANG."
        />

        <HealthCard
          type="height"
          value={`${profile.heightCm} cm`}
          label="ALTURA"
        />

        <HealthCard
          type="weight"
          value={`${profile.weightKg} kg`}
          label="PESO"
        />
      </View>

      {/* ===== INTEGRAÇÕES ===== */}
      <Text style={styles.sectionTitle}>INTEGRAÇÕES</Text>

      {/* Google Fit */}
      <View style={styles.integrationCard}>
        <View style={styles.integrationLeft}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={24}
            color="#FF6D6D"
            style={styles.integrationIcon}
          />
          <Text style={styles.integrationText}>Google Fit</Text>
        </View>

        <View style={styles.integrationBadge}>
          <Text style={styles.integrationBadgeText}>Em breve</Text>
        </View>
      </View>

      {/* Facebook */}
      <View style={styles.integrationCard}>
        <View style={styles.integrationLeft}>
          <MaterialCommunityIcons
            name="facebook"
            size={24}
            color="#5B8DEF"
            style={styles.integrationIcon}
          />
          <Text style={styles.integrationText}>Facebook</Text>
        </View>

        <View style={styles.integrationBadge}>
          <Text style={styles.integrationBadgeText}>Em breve</Text>
        </View>
      </View>
    </ScrollView>
  );
}