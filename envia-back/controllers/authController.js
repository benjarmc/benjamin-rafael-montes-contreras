const Joi = require('joi');
const {User, AccessToken} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es requerido',
        'string.alphanum': 'El nombre de usuario solo puede contener letras y números',
        'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
        'string.max': 'El nombre de usuario debe tener como máximo {#limit} caracteres',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El correo es requerido',
        'string.email': 'El correo debe ser una dirección de correo electrónico válida',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'La contraseña es requerida',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    }),
    repeat_password: Joi.ref('password'),
});

exports.login = async (req, res) => {
    console.log("body: ", req.body);
    const {username, password} = req.body;

    try {
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(400).json({message: 'Usuario no encontrado'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        await AccessToken.create({userId: user.id, token, expiresAt: new Date(Date.now() + 3600000)});

        res.json({token});
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({message: 'Error en el servidor'});
    }
};


exports.signup = async (req, res) => {
    console.log("body: " + req.body);

    const {error, value} = userSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        let {username, password, email} = value;

        let user = await User.findOne({where: {username}});
        if (user) {
            return res.status(400).json({message: 'El nombre de usuario ya está en uso'});
        }

        user = await User.findOne({where: {email}});
        if (user) {
            return res.status(400).json({message: 'El correo electrónico ya está en uso'});
        }

        user = await User.create({
            username,
            email,
            password,
        });

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        await AccessToken.create({userId: user.id, token, expiresAt: new Date(Date.now() + 3600000)});

        res.status(201).json({token});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error en el servidor'});
    }
};
