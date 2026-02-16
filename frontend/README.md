# AutoFlex Stock System

> ⚠️ Este documento contém duas versões:  
> 🇧🇷 Português (primeiro)  
> 🇺🇸 English (below)

---

# 🇧🇷 Versão em Português

## 📌 Descrição

Sistema web desenvolvido para controle de produtos, matérias-primas e planejamento de produção em um ambiente industrial.

O projeto foi desenvolvido como parte de um desafio técnico, seguindo princípios de separação de responsabilidades (API-based), arquitetura organizada e testes automatizados.

---

## 🏗 Arquitetura

O sistema é composto por:

- **Backend API** – Quarkus (Java)
- **Banco de Dados** – PostgreSQL
- **Frontend** – React (Vite)
- **ORM** – Hibernate com Panache
- **Testes Unitários**
  - Backend: JUnit
  - Frontend: Vitest + React Testing Library
- **Testes E2E** – Cypress
- **Banco containerizado com Docker**

---

## 🧰 Tecnologias Utilizadas

### Backend
- Quarkus
- Hibernate ORM
- Panache
- PostgreSQL
- REST API
- JUnit

### Frontend
- React
- Vite
- Axios
- CSS
- Vitest
- React Testing Library
- Cypress

### Infraestrutura
- Docker
- Docker Compose

---

## ✅ Requisitos Funcionais Implementados

- CRUD de Produtos
- CRUD de Matérias-Primas
- Associação entre produtos e matérias-primas
- Cálculo de produtos possíveis de serem produzidos com base no estoque
- Priorização de produção por maior valor monetário
- Interface gráfica responsiva
- Testes automatizados (unitários e E2E)

---

## 📊 Regra de Negócio

A sugestão de produção prioriza:

> Produtos de maior valor monetário primeiro.

Essa estratégia maximiza o valor total da produção possível com o estoque disponível.

---

## 🗄 Banco de Dados

O PostgreSQL é executado via Docker:

```bash
docker-compose up -d
```

Banco disponível em:

```
localhost:5432
```

---

# 🚀 Como Executar o Projeto

## 1️⃣ Subir o Banco de Dados

```bash
docker-compose up -d
```

---

## 2️⃣ Executar o Backend (Quarkus)

```bash
cd backend
./mvnw quarkus:dev
```

Backend disponível em:

```
http://localhost:8080
```

---

## 3️⃣ Executar o Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em:

```
http://localhost:5173
```

*(ou 5174 caso a porta esteja ocupada)*

---

# 🧪 Testes Automatizados

## ✅ Testes Unitários Backend

```bash
cd backend
./mvnw test
```

---

## ✅ Testes Unitários Frontend

```bash
cd frontend
npm run test
```

---

## ✅ Testes E2E (Cypress)

Modo interativo:

```bash
cd frontend
npm run cy:open
```

Modo headless:

```bash
npm run cy:run
```

Os testes E2E utilizam `cy.intercept()` para mockar as chamadas da API, garantindo execução determinística e independência do backend.

---

# 📦 Build para Produção

## Frontend

```bash
cd frontend
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Backend

```bash
cd backend
./mvnw package
```

Será gerado um arquivo `.jar` executável dentro da pasta `target/`.

---

# 📐 Decisões Técnicas

- Separação clara entre frontend e backend (arquitetura baseada em API)
- Utilização de Panache para simplificação do acesso a dados
- Uso de hooks reutilizáveis no frontend (`useCrud`, `useForm`)
- Proxy configurado no Vite para comunicação com a API
- Testes unitários no frontend e backend
- Testes E2E com mock de API para maior estabilidade

---

# 🔮 Melhorias Futuras

- Dockerização completa (backend + frontend)
- Pipeline de CI/CD
- Autenticação e autorização
- Melhoria visual da interface
- Relatório de cobertura de testes

---

# 🇺🇸 English Version

## 📌 Description

Web application developed to manage products, raw materials, and production planning in an industrial environment.

This project was developed as part of a technical assessment and follows clean architecture principles, API-based separation and automated testing practices.

---

## 🏗 Architecture

The system consists of:

- **Backend API** – Quarkus (Java)
- **Database** – PostgreSQL
- **Frontend** – React (Vite)
- **ORM** – Hibernate with Panache
- **Unit Tests**
  - Backend: JUnit
  - Frontend: Vitest + React Testing Library
- **E2E Tests** – Cypress
- **Database containerized with Docker**

---

## ✅ Implemented Functional Requirements

- Products CRUD
- Raw Materials CRUD
- Association between products and raw materials
- Production suggestion based on available stock
- Production prioritization by product value
- Responsive UI
- Automated tests (unit and E2E)

---

## 🚀 Running the Project

### 1️⃣ Start Database

```bash
docker-compose up -d
```

Database available at:

```
localhost:5432
```

---

### 2️⃣ Run Backend

```bash
cd backend
./mvnw quarkus:dev
```

Available at:

```
http://localhost:8080
```

---

### 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Available at:

```
http://localhost:5173
```

---

# 🧪 Automated Tests

### Backend

```bash
./mvnw test
```

### Frontend

```bash
npm run test
```

### E2E (Cypress)

Interactive mode:

```bash
npm run cy:open
```

Headless mode:

```bash
npm run cy:run
```

---

# 📦 Production Build

### Frontend

```bash
npm run build
```

### Backend

```bash
./mvnw package
```

---

# 📐 Technical Decisions

- Clear separation between frontend and backend
- Panache to simplify repository pattern
- Reusable React hooks
- Deterministic E2E testing using API mocking
- Clean and modular project structure

---

# 🔮 Future Improvements

- Full Dockerization
- CI/CD pipeline
- Authentication & Authorization
- UI/UX refinements
- Test coverage reporting