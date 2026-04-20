import React from "react";
import { View, Text, Pressable } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { bottomBarStyles } from "./BottomBar.styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";

// ===== MAPA DE ROTAS =====
// Centraliza os caminhos usados na bottom bar
const routes = {
  home: "/home",
  relatorios: "/relatorios",
  config: "/config",
  perfil: "/perfil",
  adicionar: "/adicionar",
} as const;

// Cria um tipo com base nos valores do objeto routes
// Ex: "/home" | "/relatorios" | ...
type Route = (typeof routes)[keyof typeof routes];

export function BottomBar() {
  // pathname = rota atual
  const pathname = usePathname();

  // router = objeto usado para navegar entre telas
  const router = useRouter();

  // ===== VERIFICA SE UMA ROTA ESTÁ ATIVA =====
  // Ex:
  // pathname === "/home"
  // ou pathname começa com "/home/"
  const isActive = (href: Route) =>
    pathname === href || pathname.startsWith(href + "/");

  // ===== DEFINE A COR DO ÍCONE =====
  // Se estiver ativo -> cor escura
  // Se não -> cor mais clara
  const getColor = (route: Route) =>
    isActive(route) ? "#2A0F0F" : "#8B6464";

  return (
    <View style={bottomBarStyles.wrap}>
      <View style={bottomBarStyles.container}>
        {/* ===== BOTÃO: HOME ===== */}
        <Pressable
          style={bottomBarStyles.navItem}
          onPress={() => router.push(routes.home)}
        >
          <Feather name="home" size={24} color={getColor(routes.home)} />

          <Text
            style={[
              bottomBarStyles.navLabel,
              isActive(routes.home) && bottomBarStyles.navLabelActive,
            ]}
          >
            Home
          </Text>
        </Pressable>

        {/* ===== BOTÃO: RELATÓRIOS ===== */}
        <Pressable
          style={bottomBarStyles.navItem}
          onPress={() => router.push(routes.relatorios)}
        >
          <MaterialIcons
            name="bar-chart"
            size={24}
            color={getColor(routes.relatorios)}
          />

          <Text
            style={[
              bottomBarStyles.navLabel,
              isActive(routes.relatorios) && bottomBarStyles.navLabelActive,
            ]}
          >
            Relatórios
          </Text>
        </Pressable>

        {/* ===== BOTÃO CENTRAL (FAB) ===== */}
        {/* Geralmente usado para ação principal do app */}
        <Pressable
          style={bottomBarStyles.fab}
          onPress={() => router.push(routes.adicionar)}
        >
          <Text style={bottomBarStyles.fabLabel}>+</Text>
        </Pressable>

        {/* ===== BOTÃO: CONFIGURAÇÕES ===== */}
        <Pressable
          style={bottomBarStyles.navItem}
          onPress={() => router.push(routes.config)}
        >
          <Feather
            name="settings"
            size={24}
            color={getColor(routes.config)}
          />

          <Text
            style={[
              bottomBarStyles.navLabel,
              isActive(routes.config) && bottomBarStyles.navLabelActive,
            ]}
          >
            Config
          </Text>
        </Pressable>

        {/* ===== BOTÃO: PERFIL ===== */}
        <Pressable
          style={bottomBarStyles.navItem}
          onPress={() => router.push(routes.perfil)}
        >
          <Feather name="user" size={24} color={getColor(routes.perfil)} />

          <Text
            style={[
              bottomBarStyles.navLabel,
              isActive(routes.perfil) && bottomBarStyles.navLabelActive,
            ]}
          >
            Perfil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}