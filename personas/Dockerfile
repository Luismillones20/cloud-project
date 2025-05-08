# Usa Node como base
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de la app
COPY . .

# Instala dependencias
RUN npm install

# Compila (opcional si usas ts-node)
RUN npm run build

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la app
CMD ["node", "dist/main"]
