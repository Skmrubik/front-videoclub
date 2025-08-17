# Use the latest LTS version of Node.js
FROM node:latest
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json
 
# Install dependencies
RUN  npm install
 
# Copy the rest of your application files
COPY . .
 
# Define the command to run your app
RUN npm run build
# --- Etapa 2: Servir la aplicación ---
# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:1.21-alpine

# Copia la configuración de Nginx para servir la app de una sola página
# (single-page application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos compilados de la etapa 'builder' a Nginx
COPY /dist /usr/share/nginx/html

# Expone el puerto 80 del contenedor, el puerto predeterminado de Nginx
EXPOSE 5173

# Comando para iniciar Nginx y servir la aplicación
CMD ["nginx", "-g", "daemon off;"]