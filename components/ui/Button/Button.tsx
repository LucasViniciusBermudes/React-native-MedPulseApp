// Importa componentes básicos do React Native
import { Pressable, Text } from "react-native";

// Importa os estilos do botão
import { styles } from "./Button.styles";

// Hook de navegação do Expo Router
import { useRouter } from 'expo-router';

/**
 * Tipagem das props do botão
 */
type ButtonProps = {
  title: string;        // texto exibido no botão
  onPress?: () => void; // função opcional executada ao clicar
};

/**
 * Componente Button reutilizável
 */
export function Button({ title, onPress }: ButtonProps) {
  
  // Instância do router (para navegação entre telas)
  // OBS: atualmente não está sendo usado no componente
  const router = useRouter();

  return (
    // Pressable: componente que detecta toque/clique
    <Pressable 
      style={styles.button} // aplica estilo do botão
      onPress={onPress}     // executa a função passada ao clicar
    >
      {/* Texto do botão */}
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </Pressable>
  );
}