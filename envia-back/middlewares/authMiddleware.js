const jwt = require('jsonwebtoken');
const {User, AccessToken} = require('../models');

const authMiddleware = async (req, res, next) => {

    const isAuth = req.header('Authorization')
    if (!isAuth) {
        return res.status(401).json({message: 'No hay token, autorización denegada'});
    }

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const accessToken = await AccessToken.findOne({where: {userId: decoded.id, token}});

        if (!accessToken) {
            return res.status(401).json({message: 'Token inválido o expirado'});
        }

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({message: 'Usuario no encontrado'});
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({message: 'Token no es válido'});
    }
};

module.exports = authMiddleware;
