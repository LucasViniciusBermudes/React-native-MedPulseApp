# 💊 MedPulse App

Aplicativo mobile desenvolvido com React Native + Expo para gerenciamento de medicamentos e lembretes inteligentes de uso.

---

## 📱 Sobre o projeto

O **MedPulse** foi criado para ajudar usuários a manterem o controle correto do uso de medicamentos, evitando esquecimentos e melhorando a adesão ao tratamento.

O app permite configurar diferentes tipos de frequência (intervalos ou horários fixos), além de controlar tratamentos por período.

---

## ✨ Funcionalidades

* 📌 Cadastro de medicamentos
* ⏱️ Frequência por intervalo (ex: a cada 8h)
* 🕒 Horários fixos personalizados
* 📆 Controle por período de tratamento
* ✅ Marcação de doses como tomadas
* 🧠 Geração automática de horários
* 🔄 Interface simples e intuitiva

---

## 🧠 Regras inteligentes

* Horários são gerados respeitando o dia atual
* `00:00` só aparece quando faz sentido matemático
* Tratamentos por período se encerram automaticamente
* Interface se adapta conforme o tipo de frequência

---

## 🚀 Tecnologias

* **React Native**
* **Expo**
* **TypeScript**
* **AsyncStorage**
* **Expo Router**

---

## 📂 Estrutura do projeto

```
app/            → telas e rotas
components/     → componentes reutilizáveis
styles/         → estilos globais
context/        → gerenciamento de estado
constants/      → constantes do app
```

---

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar o app
npx expo start
```

---

## 📸 Preview

> (adicione aqui prints do app depois 👇)

```
[ Tela inicial ]
```
<img width="248" height="559" alt="imagem" src="https://github.com/user-attachments/assets/715254c6-8124-469f-b71e-d0df14ce7432" />

```
[ Cadastro de medicamento ]
```
<img width="249" height="548" alt="imagem2" src="https://github.com/user-attachments/assets/cddc74fe-089b-42b2-a5d7-04b201efeea3" />

```
[ Lista de lembretes ]
```
<img width="249" height="542" alt="imagem3" src="https://github.com/user-attachments/assets/9eb89cae-8332-4f6f-b33c-98e491158b23" />

---

## 📌 Melhorias futuras

* 🔔 Notificações push
* ☁️ Sincronização com backend
* 👤 Autenticação de usuário
* 📊 Histórico de uso
* 🌙 Modo dark

---

## 🎨 UI/UX Design

O design do MedPulse foi prototipado no Figma, incluindo:

- Fluxo completo do usuário
- Componentes reutilizáveis
- Definição visual das telas

👉 Acesse o protótipo:
https://www.figma.com/design/JXPnx05QRglII4G62FXUMZ/MedPulse?node-id=0-1&t=cksm7AvCK3RC6HTs-1

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Vinícius Bermudes**

* GitHub: https://github.com/LucasViniciusBermudes

---

## 📄 Licença

Este projeto está sob a licença MIT.
