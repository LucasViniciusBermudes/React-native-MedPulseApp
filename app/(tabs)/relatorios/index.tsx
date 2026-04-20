import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { styles } from "../../../styles/AppLayoutStyles/relatorios.styles";

export default function RelatoriosScreen() {
  const showPremiumPopup = true;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Relatórios</Text>

        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Adesão ao Tratamento</Text>

          <View style={styles.reportMock}>
            <View style={styles.chartMock} />

            <View style={styles.metricsRow}>
              <View style={styles.metricCard} />
              <View style={styles.metricCard} />
            </View>

            <View style={styles.lineMock} />
            <View style={styles.lineMockShort} />
          </View>
        </View>
      </View>

      {showPremiumPopup && (
        <View style={styles.overlay}>
          <BlurView intensity={28} tint="light" style={styles.blurLayer} />

          <View style={styles.popupCard}>
            <View style={styles.iconCircle}>
              <FontAwesome
                name="lock"
                size={40}
                color="#631717"
              />
            </View>

            <Text style={styles.popupTitle}>Recurso Premium</Text>
            <Text style={styles.popupSubtitle}>Disponível em breve</Text>

            <Text style={styles.popupDescription}>
              Acompanhe sua evolução com gráficos detalhados e exporte
              relatórios para o seu médico.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.85}>
              <Text style={styles.buttonText}>Aguarde Novidades</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}