# Stage de build
FROM node:16.13.2-alpine AS build
WORKDIR /app

# Copia o package.json e instala as dependências
COPY package.json ./
RUN npm install

# Copia o restante do código para o diretório de trabalho
COPY . ./

# Compila o TypeScript e gera a build com Vite
RUN npm run build

# Stage de release
FROM nginx:1.21.5-alpine AS release
# Copia a build gerada no estágio anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]