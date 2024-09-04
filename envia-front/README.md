1. Validar que tengas min la versión de node 18.18.2

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
