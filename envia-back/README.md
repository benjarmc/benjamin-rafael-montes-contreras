<p align="center">
  <a href="https://tendencys.com/" target="blank"><img src="https://s3.eu-central-1.amazonaws.com/assets.factorial.co/tbgchbwhn7jbky74715k624n63yy?response-content-disposition=inline%3B%20filename%3D%22tendencys-260x80px.png%22%3B%20filename%2A%3DUTF-8%27%27tendencys-260x80px.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3HJH4LZGEM5EN2S4%2F20240903%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240903T041859Z&X-Amz-Expires=3900&X-Amz-SignedHeaders=host&X-Amz-Signature=ddedd7b15391bce7f16b3858dc417e77b07b25b7bb92d4c7b87ec834dd7b332d" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Progressive and scalable backend made with <a href="https://nodejs.org" target="_blank">Node.js</a> and Express</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

Beck end desarrollado para prueba técnica

## Installation

1. Tener configurado Node.js en la versión min 20.12.1

2. Ejecutar

```bash
$ npm install
```

3. Clonar Archivo ```.env.template``` y renombrarlo a ```.env``` y modificar valores de acuerdo al ambiente.
```
DB_PASSWORD={password}
DB_NAME={dbname}
DB_HOST={host}
DB_PORT={port}
DB_USERNAME={username}
JWT_SECRET={miClaveSecreta}
PORT={puerto}
```

4. Levantar la DB con cualquiera de los siguientes comandos
```
docker-compose up -d
docker-compose up -d --build
```

5. Levantar modo desarrollo 
```
NODE_ENV=development node index.js
```

6. Probar API con el siguiente endpoint
```
http://localhost:3000/api
```

7. Ver la documentación de la API en el siguiente endpoint
```
http://localhost:3000/docs
```
<br>
