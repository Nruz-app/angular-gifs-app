# Etapa 1: Construcción de la aplicación Angular
FROM node:21-alpine3.19 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build && ls -l /app/dist

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración personalizada de Nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de la aplicación Angular
COPY --from=build /app/dist/gifs-app/browser /usr/share/nginx/html

# Exponer el puerto 80 (Nginx usa este puerto en producción)
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
