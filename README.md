

# Projeto DSGo Version 2**

## 🎯 **Descrição do Projeto**

O **DSGo Version 2** é um sistema web desenvolvido em **React**, projetado para gerenciar diversas funcionalidades como:

* 📍 **Geolocalização com geração de rotas** (Leaflet + Routing Machine)
* 📦 **Inventário**
* 🎮 **Missões (módulo estilizado estilo Stranger Things)**
* 📊 Painéis e formulários
* 🎨 Estilização avançada usando **Sass (SCSS)**

O projeto foi criado com **Vite**, garantindo desempenho alto, rebuild rápido e ambiente moderno.

---

# 🧪 **Tecnologias Utilizadas**

* **React 18+**
* **Vite**
* **Sass / SCSS**
* **Leaflet** (mapas)
* **Leaflet Routing Machine** (rotas)
* **OpenStreetMap**
* **JavaScript ES2022**
* **React Router (se usado no projeto)**

---

# 🚀 **Funcionalidades Principais**

### 📍 Geolocalização

* Uso da localização atual do usuário (via `navigator.geolocation`)
* Geração de rotas com Leaflet Routing Machine
* Renderização de mapa com OpenStreetMap
* Entrada manual de latitude e longitude

### 🔮 Estilo “Stranger Things”

* Modais personalizados
* Cards com glow vermelho
* Efeitos neon

### 🧩 Componentes

* Inventário
* Missões
* Mapas
* Modais interativos

---

# 📦 **Instalação**

## 1️⃣ **Clonar o repositório**

```sh
git clone https://github.com/CriativoCoders/DSgo-version2
```

## 2️⃣ **Instalar dependências**

Execute:

```sh
npm install
```

### Dependências principais (instaladas automaticamente):

* react
* react-dom
* vite

---

# 🔧 **Instalar Dependências Necessárias do Projeto**

## 📍 Leaflet (mapas)

```sh
npm install leaflet
```

## 📍 Leaflet Routing Machine (rotas)

⚠ Necessário para gerar rotas no mapa

```sh
npm install leaflet-routing-machine
```

## 🎨 Sass (SCSS)

```sh
npm install sass
```

## 🔗 (Opcional) React Router

Se seu app usa navegação por páginas:

```sh
npm install react-router-dom
```

---

# ▶️ **Como Rodar o Projeto**

Após instalar tudo:

```sh
npm run dev
```

O Vite abrirá o projeto em:

```
http://localhost:5173
```

---

# 📁 **Estrutura do Projeto**

Exemplo baseado no que você mostrou:

```
src/
│── App.jsx
│── main.jsx
│── Style/
│     ├── main.scss
│     ├── variaveis.scss
│     └── StrangerThings/
│           ├── missaoCard.scss
│           ├── geolocalizacao.scss
│           └── modal.scss
│
├── Paginas/
│     ├── Geolocalizacao.jsx
│     ├── Inventario.jsx
│     └── Missoes.jsx
└── Componentes/
      ├── Modal.jsx
      └── Header.jsx
```

---

# 📝 **Licença**

Este projeto é apenas para fins acadêmicos e pessoais.

---


