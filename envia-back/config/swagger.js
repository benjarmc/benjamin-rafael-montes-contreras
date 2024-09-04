const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Benjamin M',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
         servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    if (process.env.NODE_ENV !== 'production') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log(`La documentación de la API está disponible en http://localhost:${port}/docs`);
    } else {
        console.log('La documentación de Swagger no se carga en producción.');
    }
}

module.exports = swaggerDocs;
