# Usar imagen oficial de Python
FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /orquestador2

# Copiar los archivos del proyecto
COPY . .

# Instalar dependencias
RUN  pip3 install flask flasgger mysql-connector-python pytz requests flask_cors

# Exponer el puerto donde corre Flask
EXPOSE 8002

# Comando para ejecutar el orquestador
CMD ["python", "orquestador.py"]
