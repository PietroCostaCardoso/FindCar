# 🚗 FindCar - Mobile Parking Manager

![Autor](https://img.shields.io/badge/Autor-Pietro%20Costa%20Cardoso-blue?style=flat-square&logo=github)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-Original%20Repo-green?style=flat-square)

> **Aviso:** Este é o repositório original do projeto FindCar. Se você encontrar este código em outro perfil sem os devidos créditos, ele foi plagiado.
---

### 🌐 Escolha seu idioma / Choose your language
- [Português](#-português)
- [English](#-english)

---

## 🇧🇷 Português

O **FindCar** é uma aplicação móvel híbrida desenvolvida para resolver um problema comum: esquecer onde o veículo foi estacionado. Com foco em utilidade, o app salva a localização exata, calcula o tempo de permanência e o custo em tempo real.

### 🚀 Tecnologias
* **Framework:** Ionic 7+ com React.
* **Linguagem:** JavaScript (JSX).
* **Estado:** React Hooks (`useState`, `useEffect`).
* **Navegação:** `@ionic/react-router`.
* **Persistência:** LocalStorage e Geolocation API.

### 📱 Funcionalidades
* **Salvar Vaga:** Captura coordenadas GPS e registra o horário de entrada.
* **Mapa:** Link direto para o Google Maps com a posição salva.
* **Custo em Tempo Real:** Hook customizado que atualiza o valor a pagar a cada segundo.
* **Histórico:** Registro de vagas anteriores com duração e valor total.

### 🏗️ Estrutura do Projeto
* `src/App.jsx`: Configuração do ambiente e rotas.
* `src/pages/Home.jsx`: Lógica central e interface do usuário.
* `src/theme/variables.css`: Customização de cores e temas.

---

## 🇺🇸 English

**FindCar** is a hybrid mobile application designed to solve a simple problem: forgetting where you parked. It saves your exact location, tracks elapsed time, and calculates parking costs in real-time.

### 🚀 Technologies
* **Framework:** Ionic 7+ with React.
* **Language:** JavaScript (JSX).
* **State Management:** React Hooks (`useState`, `useEffect`).
* **Routing:** `@ionic/react-router`.
* **Persistence:** LocalStorage and Geolocation API.

### 📱 Features
* **Save Spot:** Captures GPS coordinates and entry timestamp.
* **Map View:** Direct link to Google Maps with the pinned location.
* **Real-time Cost:** Custom hook that updates the total price every second.
* **History:** Local record of previous parking sessions, including duration and costs.

### 🏗️ Project Structure
* `src/App.jsx`: Environment setup and main routing.
* `src/pages/Home.jsx`: Core logic and user interface.
* `src/theme/variables.css`: Visual customization and themes.
