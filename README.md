# Desafio Shopper

Este projeto é uma aplicação para transporte particular, feita para o Desafio Full Stack da Shopper

Nome: Vinicius Lima

NOTA: Infelizmente, não consegui desenvolver em Typscript devido a não ter alcançado o conhecimento necessário, além de ter corrido para aprender Docker nesses dias, mas decidi fazer o projeto como um desafio mesmo e acho que consegui realizar 90% das funções.

## Tecnologias

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB
- **Containerização**: Docker, Docker Compose

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### VARIAVEIS DE AMBIENTE

Existem duas variáveis de ambiente

Frontend

VITE_GOOGLE_API_KEY

O banco de dados é em MondoDB na Nuvem, podem utilizar o meu onde ja está cadastrado os usuários de testes

Clientes podem ser cadastrados nos endpoints



### Rodando localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/vinimateusdev/desafio-shopper.git
   cd desafio-shopper

2. Instale as dependências do backend:

cd backend
npm install

3. Instale as dependências do frontend:

cd frontend
npm install

Inicie o backend:

npm start

Inicie o frontend:

npm run preview

Rodando com Docker

4. Execute o comando para construir e rodar os containers:

docker-compose up --build
