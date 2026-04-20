import { View, Text } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import { styles } from "@/styles/AppLayoutStyles/perfil.styles";

// Tipagem das props do componente
type Props = {
  type: "imc" | "blood" | "height" | "weight"; // Tipo do card (define ícone e cor)
  value: string | number; // Valor exibido (ex: 70kg, 1.75m)
  label: string; // Texto descritivo (ex: Peso, Altura)
};

export function HealthCard({ type, value, label }: Props) {

  // ===== FUNÇÃO PARA RENDERIZAR ÍCONE =====
  // Retorna ícone + cor baseado no tipo
  function renderIcon() {
    switch (type) {

      case "imc":
        return (
          <View style={styles.iconCirclePurple}>
            {/* Ícone de pulso (IMC) */}
            <MaterialCommunityIcons name="pulse" size={24} color="#B77BFF" />
          </View>
        );

      case "blood":
        return (
          <View style={styles.iconCircleRed}>
            {/* Ícone de sangue */}
            <Ionicons name="water-outline" size={24} color="#FF7373" />
          </View>
        );

      case "height":
        return (
          <View style={styles.iconCircleBlue}>
            {/* Ícone de régua (altura) */}
            <FontAwesome5 name="ruler" size={24} color="#5DA8FF" />
          </View>
        );

      case "weight":
        return (
          <View style={styles.iconCircleOrange}>
            {/* Ícone de peso */}
            <MaterialCommunityIcons name="weight" size={24} color="#FF9A42" />
          </View>
        );
    }
  }

  return (
    <View style={styles.healthCard}>
      
      {/* Ícone dinâmico baseado no tipo */}
      {renderIcon()}

      {/* Valor principal (destaque) */}
      <Text style={styles.healthValue}>{value}</Text>

      {/* Label descritiva */}
      <Text style={styles.healthLabel}>{label}</Text>
    </View>
  );
}