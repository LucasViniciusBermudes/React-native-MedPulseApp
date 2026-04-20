import { ScrollView, Text, View, Switch, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

// Importa os estilos da tela
import { styles } from "../../../styles/AppLayoutStyles/config.styles";

export default function ConfigScreen() {
  // ===== ESTADOS DAS CONFIGURAÇÕES =====
  // Controla se notificações estão ativadas
  const [notifications, setNotifications] = useState(true);

  // Controla se o som do alarme está ativo
  const [alarmSound, setAlarmSound] = useState(true);

  // Controla se o modo escuro está ativo
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      // Estilo principal da tela
      style={styles.container}

      // Estilo do conteúdo interno (padding, alinhamento, etc.)
      contentContainerStyle={styles.content}

      // Remove barra de scroll vertical
      showsVerticalScrollIndicator={false}
    >
      {/* TÍTULO DA PÁGINA */}
      <Text style={styles.pageTitle}>Configurações</Text>

      {/* ===== CARD PRINCIPAL DE CONFIGURAÇÕES ===== */}
      <View style={styles.card}>
        
        {/* ===== ITEM: NOTIFICAÇÕES ===== */}
        <View style={styles.item}>
          <View style={styles.left}>
            {/* Ícone */}
            <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            
            {/* Texto */}
            <Text style={styles.label}>Notificações</Text>
          </View>

          {/* Switch que ativa/desativa notificações */}
          <Switch 
            value={notifications} 
            onValueChange={setNotifications} 
          />
        </View>

        {/* ===== ITEM: SOM DO ALARME ===== */}
        <View style={styles.item}>
          <View style={styles.left}>
            <Feather name="volume-2" size={24} color="#6B7280" />
            <Text style={styles.label}>Sons do Alarme</Text>
          </View>

          {/* Switch de som */}
          <Switch 
            value={alarmSound} 
            onValueChange={setAlarmSound} 
          />
        </View>

        {/* ===== ITEM: MODO ESCURO ===== */}
        <View style={styles.item}>
          <View style={styles.left}>
            <Ionicons name="moon-outline" size={24} color="#6B7280" />
            <Text style={styles.label}>Modo Escuro</Text>
          </View>

          {/* Switch de tema */}
          <Switch 
            value={darkMode} 
            onValueChange={setDarkMode} 
          />
        </View>
      </View>

      {/* ===== CARD: POLÍTICA DE PRIVACIDADE ===== */}
      <TouchableOpacity style={styles.card}>
        <View style={styles.item}>
          <View style={styles.left}>
            {/* Ícone */}
            <MaterialIcons name="privacy-tip" size={24} color="#6B7280" />

            {/* Texto */}
            <Text style={styles.label}>Política de Privacidade</Text>
          </View>

          {/* Ícone de seta indicando navegação */}
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>

      {/* ===== BOTÃO: LIMPAR DADOS ===== */}
      <TouchableOpacity style={styles.deleteButton}>
        {/* Ícone de lixeira */}
        <Feather name="trash-2" size={24} color="#EF4444" />

        {/* Texto do botão */}
        <Text style={styles.deleteText}>Limpar todos os dados</Text>
      </TouchableOpacity>

      {/* ===== VERSÃO DO APP ===== */}
      <Text style={styles.version}>Versão 1.0.0</Text>
    </ScrollView>
  );
}