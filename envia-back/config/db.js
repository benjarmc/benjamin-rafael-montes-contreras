const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos PostgreSQL'))
    .catch(err => console.log('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
