# Usar imagem base do Node.js
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /frontend

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos da pasta frontend
COPY . .

# Rodar o build para gerar o diretório dist
RUN npm run build

# Verificar se o diretório dist foi gerado corretamente
RUN ls -l /frontend/dist

# Expor a porta
EXPOSE 80

# Rodar o servidor de preview
CMD ["npm", "run", "preview"]

# Usar o usuário root
USER root
