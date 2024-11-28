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

Backend

### GOOGLE_API_KEY

Frontend

### VITE_GOOGLE_API_KEY

### Banco de Dados

O banco de dados é em MondoDB na Nuvem, podem utilizar o meu onde já está cadastrado os usuários de testes


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

### Rodando com Docker

4. Execute o comando para construir e rodar os containers:

docker-compose up --build

## Testes

### Endpoints

Principais

POST /ride/estimate
PATCH /ride/confirm
GET /ride/getCustomerRidesByDriver/id_do_cliente?driver_id=id_do_usuario

Extra

GET /ride/getDriver

### Clientes podem ser cadastrados nos endpoints

Cadastrar Cliente
/ride/createCustomer

### Exemplo já existentes no banco

{
  "customer_id": "1",
  "name": "Vinicius"
}

{
  "customer_id": "2",
  "name": "João"
}

...

### Motorista
/ride/createDriver

### Exemplo

{
  "id": 3,
  "name": "James Bond",
  "description": "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
  "vehicle": "Aston Martin DB5 clássico",
  "review": [
    {
      "rating": 5,
      "comment": "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto."
    },
    {
      "rating": 4,
      "comment": "Viagem excelente, mas achei o trajeto um pouco longo. Ainda assim, a experiência foi incrível!"
    }
  ],
  "kmMin": 10,
  "tax": 10.00
}

## Conecte-se comigo

[![Perfil DIO](https://img.shields.io/badge/-Meu%20Perfil%20na%20DIO-30A3DC?style=for-the-badge)](https://web.dio.me/users/viniciusmateus_dev?tab=skills)
[![E-mail](https://img.shields.io/badge/-Email-000?style=for-the-badge&logo=microsoft-outlook&logoColor=E94D5F)](mailto:viniciusmateus.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/vinicius-mateus-924807181/)

## 🛠 Habilidades

![HTML5](https://img.shields.io/badge/HTML5-000?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-000?style=for-the-badge&logo=css3&logoColor=264CE4)
![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript)
![Java](https://img.shields.io/badge/Java-000?style=for-the-badge&logo=java)
![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react)
![Angular](https://img.shields.io/badge/Angular-000?style=for-the-badge&logo=angular&logoColor=C3002F)

## 🔗 Vamos trabalhar juntos?
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/vinicius-mateus-924807181/)
[![Instagram](https://img.shields.io/badge/Instagram-000?style=for-the-badge&logo=instagram)](https://www.instagram.com/viniciuslimadev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/vinimateuslima)