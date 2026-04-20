import React from "react";
import { View, Text, Image } from "react-native";
import { headerStyles } from "./Header.styles";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente de cabeçalho (Header)
export function Header() {
  return (
    // SafeAreaView evita sobreposição com notch/status bar
    <SafeAreaView style={headerStyles.container}>
      
      {/* Container horizontal do header */}
      <View style={headerStyles.row}>
        
        {/* Ícone/logo do app */}
        <Image
          source={require("@/assets/images/icon.png")} // Caminho da imagem
          style={headerStyles.icon} // Estilo do ícone
        />

        {/* Título do app */}
        <Text style={headerStyles.title}>
          
          {/* Parte principal do nome */}
          <Text style={headerStyles.titlePrimary}>Med</Text>
          
          {/* Parte destacada do nome */}
          <Text style={headerStyles.titleHighlight}>Pulse</Text>
        
        </Text>
      </View>
    </SafeAreaView>
  );
}