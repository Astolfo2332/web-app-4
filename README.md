# Docker deploid para LdeSA

## Uso
Primero se ejecuta la colonación del repositorio en la carpeta de elección en un cmd:
```
git clone https://github.com/Astolfo2332/web-app-4
```
Seguidamente en la carpeta /flask-backend-mongo se ejecuta los comandos para crear las imágenes 
```
docker-compose build
```
Se genera el despliegue con 
```
docker-compose up
```


## Notas
- Si el sistema viene como configuración default de poblar la base de datos con una de prueba, si no se desea esto comentar las siguientes lineas que crean el contenedor e imagen de mongo de la forma:

```
mongo:
        image: docker.io/mongo:latest
        ports:
            - 27017:27017
        env_file:
            - ./.env
        #volumes:
           #- ./data/mongo:/data/db

```
