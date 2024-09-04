<p align="center">
  <a href="https://tendencys.com/" target="blank"><img src="https://s3.eu-central-1.amazonaws.com/assets.factorial.co/tbgchbwhn7jbky74715k624n63yy?response-content-disposition=inline%3B%20filename%3D%22tendencys-260x80px.png%22%3B%20filename%2A%3DUTF-8%27%27tendencys-260x80px.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3HJH4LZGEM5EN2S4%2F20240903%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240903T041859Z&X-Amz-Expires=3900&X-Amz-SignedHeaders=host&X-Amz-Signature=ddedd7b15391bce7f16b3858dc417e77b07b25b7bb92d4c7b87ec834dd7b332d" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Progressive and scalable backend and frontend made with <a href="https://nodejs.org" target="_blank">Node.js</a></p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

Back-end desarrollado para prueba técnica con Node.js v20.12.1

Front-end desallorrado con Node.js 18.18.2 y Angular 16

## Clonación Repositorio

0. Tener configurado Node.js en la versión min 20.12.1
<br><br>
1. Clonar Repositorio [envia](git@github.com:digitalconquestmx/benjamin-rafael-montes-contreras.git) en la rama correspondiente
<br><br>

## Levantar Back-end

1. Cambiarse al directorio ```/envia-back```

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
DB_USERNAME=postgres #para pruebas locales se recomienda este usuario ya que con doncket no se crea alguno
JWT_SECRET={miClaveSecreta}
PORT=3000 #puerto default
```

4. Levantar la DB con cualquiera de los siguientes comandos, previamente debería tener Docker
```
docker-compose up -d
docker-compose up -d --build
```

5. Levantar modo desarrollo con el siguiente comando en consola
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


## Levantar Front-end

1. Cambiarse al directorio ```/envia-front```

2. Ejecutar

```bash
$ npm install
```

3. Validar configuración de archivo ```/src/environments/environment.ts``` si se ocupara en modo local la configuración dejarla así en las ```url```, solo validar ```tk_envia``` sea corecto


```ts
export const environment = {
  production: false,
  url_api: "http://localhost:4200/api/",
  url_envia: "http://localhost:4200/envia",
  tk_envia: "8af188fb1b693a0f30ca40a2634208be6753d79e36e48bf5351cce83c324e9c0",
  url_queries: "http://localhost:4200/queries/",
}
```

4. Solo local, validar configuración de archivo ```proxy.conf.json``` que las url sean correctas

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": "/api"
    },
    "logLevel": "debug"
  },
  "/envia": {
    "target": "https://api-test.envia.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/envia": "/"
    },
    "logLevel": "debug"
  },
  "/queries": {
    "target": "https://queries-test.envia.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/queries": "/"
    },
    "logLevel": "debug"
  }
}

```

5. Levantar modo desarrollo con el siguiente comando en consola

```bash
npm run start-proxy
```

6. Probar el front con la siguiente url

```
http://localhost:4200
```

<br>
