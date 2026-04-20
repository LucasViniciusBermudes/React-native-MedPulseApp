/**
 * Arquivo "barrel" (índice) do módulo ProfileSetup.
 *
 * Centraliza todas as exportações do módulo em um único ponto,
 * facilitando a importação em outras partes do app.
 *
 * Exemplo de uso:
 *   import { Header, Field, Input, Row, Button } from "../components/ProfileSetup";
 *
 * Em vez de:
 *   import { Header } from "../components/ProfileSetup/Header";
 *   import { Field } from "../components/ProfileSetup/Field";
 *   ...
 */

// ===== BOTÃO =====
// Exporta o componente de botão reutilizável (UI global)
export { Button } from "../ui/Button/Button";

// ===== FIELD =====
// Wrapper de campo: label + input + mensagem de erro
export { Field } from "./Field/Field";

// ===== HEADER =====
// Cabeçalho do fluxo (topo com logo e textos)
export { Header } from "./Header/Header";

// ===== INPUT =====
// Input customizado com suporte a erro e estilos padronizados
export { Input } from "./Input/Input";

// ===== FORM PRINCIPAL =====
// Exporta o formulário principal como nomeado
// (originalmente default export)
export { default as ProfileSetupForm } from "./ProfileSetupForm";

// ===== ROW =====
// Componente de layout para organizar campos lado a lado
export { Row } from "./Row/Row";