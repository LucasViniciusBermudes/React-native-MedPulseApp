import React from "react";
import { View } from "react-native";
import { layoutsStyles } from "@/styles/layouts.styles";
import { Header } from "./Header/Header";
import { BottomBar } from "./BottomBar/BottomBar";

// Tipagem das props
type Props = { children: React.ReactNode }; // Conteúdo interno (telas)

export function AppShell({ children }: Props) {
  return (
    // Container principal da tela
    <View style={layoutsStyles.screen}>
      
      {/* ===== HEADER ===== */}
      {/* Cabeçalho fixo no topo */}
      <Header />

      {/* ===== CONTEÚDO ===== */}
      {/* Área onde as telas/rotas são renderizadas */}
      <View style={layoutsStyles.content}>
        {children}
      </View>

      {/* ===== BOTTOM BAR ===== */}
      {/* Barra de navegação inferior */}
      <BottomBar />
    </View>
  );
}