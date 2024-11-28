FROM node:latest

WORKDIR /frontend


COPY package*.json ./

COPY . .

RUN npm install


RUN npm run build


RUN ls -l /frontend/dist


EXPOSE 80

CMD ["npm", "run", "preview"]

# Usar o usuário root
USER root
