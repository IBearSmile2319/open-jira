# Next.js OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__ 
```
services:
  entriesdb:
    image: mongo:5.0.0
    container_name: entries-database
    ports:
      - 27017:27017
    volumes:
      - ./mongo:/data/db
```

* El puerto 27017 es el puerto por defecto de mongo
```
mongodb://localhost:27017/entries
```

## Configurar las variables de entorno
Renombrar el archivo __.env.local.example__ a __.env.local__ y agregar las variables de entorno

## Llenar la base de datos con información de pruebas

Llammar a la API __/api/seed__ para llenar la base de datos con información de pruebas