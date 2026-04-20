import { Slot } from "expo-router";

// Layout base da aplicação (header, navegação, etc.)
import { AppShell } from "@/components/AppLayout";

// Provider global que gerencia os tratamentos (Context API)
import { TreatmentProvider } from "@/context/TreatmentContext";

export default function TabsLayout() {
  return (
    // ===== CONTEXTO GLOBAL =====
    // Tudo dentro disso terá acesso aos tratamentos
    <TreatmentProvider>

      {/* ===== ESTRUTURA BASE DA UI ===== */}
      {/* Aqui você define o "layout padrão" do app */}
      <AppShell>

        {/* ===== RENDERIZAÇÃO DAS TELAS ===== */}
        {/* O Slot é onde o conteúdo das rotas (tabs) será renderizado */}
        <Slot />

      </AppShell>
    </TreatmentProvider>
  );
}