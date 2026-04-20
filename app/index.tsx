import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função de validação dos dados do perfil
import { validateProfile } from "../utils/validateProfile";

// Componentes da tela de setup de perfil
import { Header } from "../components/ProfileSetup";
import ProfileSetupForm, {
  type ProfileSetupErrors,
} from "../components/ProfileSetup/ProfileSetupForm";

// Estilos da tela
import { styles } from "../styles/profileSetup.styles";

// ===== TIPAGEM DOS DADOS DO PERFIL =====
type ProfileData = {
  fullName: string;
  birthDate: string;
  gender: string;
  bloodType: string;
  heightCm: number;
  weightKg: number;
};

export default function Index() {
  // ===== ESTADOS DO FORMULÁRIO =====
  const [fullName, setFullName] = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [bloodOpen, setBloodOpen] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Guarda erros de validação por campo
  const [errors, setErrors] = useState<ProfileSetupErrors>({});

  // ===== REMOVE O ERRO DE UM CAMPO ESPECÍFICO =====
  // Ex: quando o usuário começa a digitar novamente
  const clearError = (field: keyof ProfileSetupErrors) => {
    setErrors((prev) => {
      // Se esse campo já não tiver erro, mantém igual
      if (!prev[field]) return prev;

      // Cria cópia do objeto de erros e remove só o campo informado
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // ===== HANDLERS DOS CAMPOS =====
  // Cada um atualiza o estado e limpa o erro correspondente

  const onChangeFullName = (v: string) => {
    setFullName(v);
    clearError("fullName");
  };

  const onChangeBirthDate = (v: string) => {
    setBirthDate(v);
    clearError("birthDate");
  };

  const onChangeGender = (v: string | null) => {
    setGender(v);
    clearError("gender");
  };

  const onChangeBloodType = (v: string | null) => {
    setBloodType(v);
    clearError("bloodType");
  };

  const onChangeHeight = (v: string) => {
    setHeight(v);
    clearError("height");
  };

  const onChangeWeight = (v: string) => {
    setWeight(v);
    clearError("weight");
  };

  // ===== ENVIO DO FORMULÁRIO =====
  const handleSubmit = async () => {
    // Valida todos os dados antes de salvar
    const e = validateProfile({
      fullName,
      birthDate,
      gender,
      bloodType,
      height,
      weight,
    });

    // Atualiza os erros na tela
    setErrors(e);

    // Se existir qualquer erro, interrompe o envio
    if (Object.keys(e).length > 0) return;

    // Normaliza o nome:
    // remove espaços extras entre palavras
    const name = fullName.trim().replace(/\s+/g, " ");

    // Converte data de nascimento de dd/mm/aaaa para objeto Date
    const [day, month, year] = birthDate.split("/").map(Number);
    const birthDateObj = new Date(year, month - 1, day);

    // Monta o objeto final do perfil
    const profileData: ProfileData = {
      fullName: name,
      birthDate: birthDateObj.toISOString(), // salva em formato padronizado
      gender: gender!,
      bloodType: bloodType!,
      heightCm: Number(height),
      weightKg: Number(weight),
    };

    try {
      // Salva o perfil localmente no dispositivo
      await AsyncStorage.setItem("@profile", JSON.stringify(profileData));

      // Redireciona para a tela de perfil após salvar
      router.replace("/(tabs)/perfil");
    } catch (error) {
      console.log("Erro ao salvar perfil:", error);
    }
  };

  // ===== UI =====
  return (
    <View style={styles.container}>
      {/* Cabeçalho da tela */}
      <Header />

      {/* Formulário principal */}
      <ProfileSetupForm
        fullName={fullName}
        setFullName={onChangeFullName}
        genderOpen={genderOpen}
        setGenderOpen={setGenderOpen}
        bloodOpen={bloodOpen}
        setBloodOpen={setBloodOpen}
        gender={gender}
        setGender={onChangeGender}
        bloodType={bloodType}
        setBloodType={onChangeBloodType}
        height={height}
        setHeight={onChangeHeight}
        weight={weight}
        setWeight={onChangeWeight}
        birthDate={birthDate}
        setBirthDate={onChangeBirthDate}
        errors={errors}
        onSubmit={handleSubmit}
      />
    </View>
  );
}