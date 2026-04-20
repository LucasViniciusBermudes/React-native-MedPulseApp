// Importa React e os hooks useEffect e useState
import React, { useEffect, useState } from "react";

// Importa tipos e utilitários do React Native
import { Platform, StyleProp, ViewStyle } from "react-native";

// Importa o componente de dropdown pronto da biblioteca
import DropDownPicker from "react-native-dropdown-picker";

// Importa estilos locais do Select
import { selectStyles } from "./Select.styles";

/**
 * Tipo de cada opção do select
 * label = texto exibido
 * value = valor real da opção
 */
export type Option = { label: string; value: string };

/**
 * Tipagem das props do componente
 */
type Props = {
  open: boolean; // controla se o dropdown está aberto ou fechado
  onOpenChange: (open: boolean) => void; // callback para alterar estado de abertura

  value: string | null; // valor atualmente selecionado
  onValueChange: (value: string | null) => void; // callback para alterar valor selecionado

  options: Option[]; // lista de opções disponíveis
  placeholder?: string; // texto exibido quando nada foi selecionado

  style?: StyleProp<ViewStyle>; // estilo customizado do campo principal
  dropDownStyle?: StyleProp<ViewStyle>; // estilo customizado da lista aberta

  zIndex?: number; // prioridade visual do select
  zIndexInverse?: number; // zIndex alternativo usado pelo DropDownPicker
};

/**
 * Componente Select reutilizável
 */
export function Select({
  open,
  onOpenChange,
  value,
  onValueChange,
  options,
  placeholder,
  style,
  dropDownStyle,
  zIndex = 3000,
  zIndexInverse = 1000,
}: Props) {
  // Estado interno com os itens do dropdown
  // É necessário porque o DropDownPicker trabalha com setItems
  const [items, setItems] = useState(options);

  /**
   * Sempre que as opções recebidas por props mudarem,
   * atualiza o estado interno dos itens
   */
  useEffect(() => {
    setItems(options);
  }, [options]);

  return (
    <DropDownPicker
      // Estado de aberto/fechado
      open={open}

      // Trata mudança de aberto/fechado
      setOpen={(action) => {
        // O DropDownPicker pode passar um valor direto
        // ou uma função que recebe o estado atual
        const nextOpen = typeof action === "function" ? action(open) : action;
        onOpenChange(nextOpen);
      }}

      // Valor selecionado
      value={value}

      // Trata mudança do valor selecionado
      setValue={(action) => {
        // Também pode vir como valor direto ou função
        const nextValue = typeof action === "function" ? action(value) : action;
        onValueChange(nextValue ?? null);
      }}

      // Lista de opções
      items={items}

      // Setter exigido pela lib para atualizar os itens
      setItems={setItems}

      // Texto placeholder
      placeholder={placeholder}

      // No web usa ScrollView; no mobile usa FlatList
      // Isso melhora compatibilidade entre plataformas
      listMode={Platform.OS === "web" ? "SCROLLVIEW" : "FLATLIST"}

      // Controle de sobreposição visual
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}

      // Estilo do campo principal
      style={[selectStyles.container, style]}

      // Estilo da caixa aberta do dropdown
      dropDownContainerStyle={[
        selectStyles.dropdown,
        dropDownStyle,
        { zIndex },
      ]}
    />
  );
}