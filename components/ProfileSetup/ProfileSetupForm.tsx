// Importação de bibliotecas principais do React e React Native
import React from "react";
import { ScrollView, Text, View } from "react-native";

// Importação de ícones
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// Importação de estilos e componentes reutilizáveis
import { styles } from "../../styles/profileSetup.styles";
import { Button } from "../ui/Button/Button";
import { Field } from "./Field/Field";
import { Input } from "./Input/Input";
import { Row } from "./Row/Row";

// Inputs customizados
import { DateInput } from "../ui/DateInput/DateInput";
import { Select } from "../ui/Select/Select";

// Constantes de opções para selects
import { bloodTypeOptions } from "../../constants/bloodTypeOptions";
import { genderOptions } from "../../constants/genderOptions";

// Função de validação de idade mínima
import { validateMinimumAge } from "@/utils/date.validators";

/**
 * Tipo de erros do formulário.
 * Usa Partial para tornar todos os campos opcionais.
 */
export type ProfileSetupErrors = Partial<{
  fullName: string;
  birthDate: string;
  gender: string;
  height: string;
  weight: string;
  bloodType: string;
}>;

/**
 * Textos da tela
 */
const TITLE = "Bem-vindo(a) 👋";
const DESCRIPTION =
  "Vamos configurar seu perfil para personalizar sua experiência.";

/**
 * Configuração de zIndex dos dropdowns
 * Evita sobreposição incorreta entre selects
 */
const Z_INDEX = {
  gender: { zIndex: 4000, zIndexInverse: 1000 },
  blood: { zIndex: 3000, zIndexInverse: 2000 },
};

/**
 * Helper para permitir apenas números
 * Remove tudo que não for número e limita o tamanho
 */
const onlyNumbers = (text: string, max = 3) => {
  return text.replace(/[^0-9]/g, "").slice(0, max);
};

/**
 * Props recebidas do container (estado vem de fora)
 */
type Props = {
  fullName: string;
  setFullName: (v: string) => void;

  genderOpen: boolean;
  setGenderOpen: (open: boolean) => void;

  bloodOpen: boolean;
  setBloodOpen: (open: boolean) => void;

  gender: string | null;
  setGender: (v: string | null) => void;

  bloodType: string | null;
  setBloodType: (v: string | null) => void;

  height: string;
  setHeight: (v: string) => void;

  weight: string;
  setWeight: (v: string) => void;

  birthDate: string;
  setBirthDate: (v: string) => void;

  errors?: ProfileSetupErrors;

  onSubmit: () => void;
};

/**
 * Componente principal do formulário
 */
export default function ProfileSetupForm({
  fullName,
  setFullName,

  genderOpen,
  setGenderOpen,
  bloodOpen,
  setBloodOpen,

  gender,
  setGender,
  bloodType,
  setBloodType,

  height,
  setHeight,
  weight,
  setWeight,

  birthDate,
  setBirthDate,

  errors,
  onSubmit,
}: Props) {
  return (
    // ScrollView para permitir rolagem da tela
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Título */}
      <Text style={styles.title}>{TITLE}</Text>

      {/* Descrição */}
      <Text style={styles.description}>{DESCRIPTION}</Text>

      {/* ================= NOME ================= */}
      <Field label="NOME COMPLETO" error={errors?.fullName}>
        <View
          style={[
            styles.inputWithIcon,
            errors?.fullName ? styles.inputError : null,
          ]}
        >
          {/* Ícone */}
          <Feather
            name="user"
            size={20}
            color="#98A2B3"
            style={{ marginRight: 8 }}
          />

          {/* Input de nome */}
          <Input
            value={fullName}
            onChangeText={setFullName}
            placeholder="Como gostaria de ser chamado?"
            hasError={false}
            bare
          />
        </View>
      </Field>

      {/* ================= NASCIMENTO + GÊNERO ================= */}
      <Row>
        {/* Data de nascimento */}
        <View style={{ flex: 1.2 }}>
          <Field label="NASCIMENTO" error={errors?.birthDate}>
            <DateInput
              value={birthDate}
              onChange={setBirthDate}
              error={errors?.birthDate}
              maxDate={new Date()} // não permite datas futuras
              maxDateMessage="A data de nascimento não pode ser futura"
              validate={validateMinimumAge(13)} // idade mínima 13 anos
              icon={<Feather name="calendar" size={20} color="#98A2B3" />}
            />
          </Field>
        </View>

        {/* Select de gênero */}
        <View style={{ flex: 1 }}>
          <Field label="GÊNERO" error={errors?.gender}>
            <Select
              open={genderOpen}
              onOpenChange={(open) => {
                setGenderOpen(open);
                if (open) setBloodOpen(false); // fecha outro dropdown
              }}
              value={gender}
              onValueChange={setGender}
              options={genderOptions}
              placeholder="Selecione"
              style={[
                styles.selectGender,
                errors?.gender ? styles.inputError : null,
              ]}
              dropDownStyle={styles.selectDropdown}
              {...Z_INDEX.gender}
            />
          </Field>
        </View>
      </Row>

      {/* ================= ALTURA + PESO + SANGUÍNEO ================= */}
      <Row>
        {/* Altura */}
        <Field label="ALTURA (CM)" error={errors?.height}>
          <View
            style={[
              styles.inputWithIcon,
              errors?.height ? styles.inputError : null,
            ]}
          >
            <FontAwesome5
              name="ruler"
              size={20}
              color="#98A2B3"
              style={{ marginRight: 8 }}
            />

            <Input
              value={height}
              onChangeText={(text) => setHeight(onlyNumbers(text))}
              keyboardType="numeric"
              placeholder="170"
              hasError={false}
              bare
            />
          </View>
        </Field>

        {/* Peso */}
        <Field label="PESO (KG)" error={errors?.weight}>
          <View
            style={[
              styles.inputWithIcon,
              errors?.weight ? styles.inputError : null,
            ]}
          >
            <MaterialCommunityIcons
              name="weight"
              size={20}
              color="#98A2B3"
              style={{ marginRight: 8 }}
            />

            <Input
              value={weight}
              onChangeText={(text) => setWeight(onlyNumbers(text))}
              keyboardType="numeric"
              placeholder="70"
              hasError={false}
              bare
            />
          </View>
        </Field>

        {/* Tipo sanguíneo */}
        <Field label="SANGUÍNEO" error={errors?.bloodType}>
          <Select
            open={bloodOpen}
            onOpenChange={(open) => {
              setBloodOpen(open);
              if (open) setGenderOpen(false); // fecha outro dropdown
            }}
            value={bloodType}
            onValueChange={setBloodType}
            options={bloodTypeOptions}
            placeholder="Selecione"
            style={[
              styles.selectBlood,
              errors?.bloodType ? styles.inputError : null,
            ]}
            dropDownStyle={styles.selectDropdown}
            {...Z_INDEX.blood}
          />
        </Field>
      </Row>

      {/* Botão de envio */}
      <Button title="Começar Agora →" onPress={onSubmit} />
    </ScrollView>
  );
}