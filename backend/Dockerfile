FROM node:latest

WORKDIR /backend

COPY package*.json ./

RUN npm i

COPY .env ./

COPY /src ./src

CMD ["npm", "start"]

EXPOSE 8080