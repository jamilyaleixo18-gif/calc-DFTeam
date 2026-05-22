# Chatbot Nutricional

Assistente de nutrição com interface em React e API em Node.js (Claude/Anthropic).

## Estrutura

- `frontend/` — interface React (Vite)
- `backend/` — API Express

## Pré-requisitos

- Node.js 18+
- Chave da API Anthropic

## Configuração

1. No backend, copie o exemplo de variáveis de ambiente:

```bash
cd backend
cp .env.example .env
```

2. Edite `backend/.env` e coloque sua `ANTHROPIC_API_KEY`.

3. Instale as dependências:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Executar em desenvolvimento

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Abra http://localhost:5173 no navegador.

## API

- `POST /api/chat` — envia histórico de mensagens e recebe resposta do assistente
