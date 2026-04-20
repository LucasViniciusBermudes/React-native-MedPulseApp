import { Stack } from "expo-router";

/**
 * ===== ROOT LAYOUT =====
 *
 * Esse é o layout raiz do app usando expo-router.
 * Tudo começa por aqui.
 *
 * Ele define como as rotas (telas) serão organizadas
 * e qual tipo de navegação será usado.
 */
export default function RootLayout() {
  return (
    <Stack
      // ===== CONFIGURAÇÕES GLOBAIS DO STACK =====
      screenOptions={{
        // Remove o header padrão do React Navigation
        // (porque você provavelmente está usando um header custom no AppShell)
        headerShown: false,
      }}
    />
  );
}