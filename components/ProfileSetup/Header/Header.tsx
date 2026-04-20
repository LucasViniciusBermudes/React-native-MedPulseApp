import { Image, Text, View } from "react-native";
import { styles } from "./Header.styles";

// Componente de cabeçalho da tela inicial
export function Header() {
  return (
    <View style={styles.header}>
      
      {/* ===== IMAGEM DE FUNDO (WATERMARK) ===== */}
      {/* Imagem grande e transparente usada como decoração */}
      <Image
        source={require("../../../assets/images/icon.png")}
        style={styles.watermark}
      />

      {/* ===== LOGO PRINCIPAL ===== */}
      <Image
        source={require("../../../assets/images/icon.png")}
        style={styles.logo}
      />

      {/* ===== NOME DO APP ===== */}
      <Text style={styles.appName}>MedPulse</Text>

      {/* ===== SUBTÍTULO ===== */}
      <Text style={styles.subtitle}>
        Tecnologia que cuida de você
      </Text>
    </View>
  );
}