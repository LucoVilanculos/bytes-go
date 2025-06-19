<h1>Projecto Hackton - Bytes-Go (React + Express + TypeScript + MongoDB)<h1></h1>
  
Este repositório contém o projecto para apresentar no Hackton desenvolvido pelos alunos da segunda edição do Bytes 4 Future (B4F), (grupo2).
O projecto coniste em um sistema que busca resolver um problema de uma empresa Moçambicana que faz táxi por aplicativo. 
Este projecto consiste igualmente em um sistema com frontend em React e backend em Express + TypeScript + MongoDB. 



## 📁 Estrutura do Projeto
/(raiz)
├── /backend        # API RESTful com Express + TypeScript + MongoDB
├── /frontend       # Aplicação web com React.js
└── README.md

```
---
## 🚀 Tecnologias Utilizadas
🛠️ Backend
-Express
-MongoDB + Mongoose
-TypeScript
-Dotenv
-JWT
-Bcrypt
-Nodemailer

## 🌐 Frontend

- React.js
- Vite
- TypeScript
- TailwindCSS
- React Hook Form + Zod
- React Router 
- Radix UI
- Framer Motion
- Leaflet (mapas)
```
---
## ✅ Funcionalidades do Sistema

### 👤 Autenticação e Autorização
-Registra o usúario com validação;
- Login com  JWT (JSON Web Token);
-rPoteção de rotas (acesso apenas com token válido)

### 📦 Gestão de Dados
- Criação, leitura, atualização e remoção (CRUD);
- Integração com banco de dados MongoDB usando Mongoose
- Validação de dados com Zod no frontend e middleware no backend;

### Outras Funcionalidades:
-Exibição de mapas  com localização via Leaflet;

## ⚙️ Como Executar o Projecto

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
