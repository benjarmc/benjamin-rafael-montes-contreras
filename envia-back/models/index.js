const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./users')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const AccessToken = require('./accessToken')(sequelize, Sequelize);

User.hasMany(AccessToken);

module.exports = {sequelize, User, Product, AccessToken};
