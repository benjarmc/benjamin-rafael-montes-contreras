const Joi = require('joi');
const {User} = require('../models');

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
    })
});


exports.getProfile = async (req, res) => {
    try {
        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        });
    } catch (err) {
        res.status(500).json({message: 'Error en el servidor'});
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: 'Error al obtener los usuarios'});
    }
};


exports.getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({message: 'Error al obtener el usuario'});
    }
};


exports.updateUser = async (req, res) => {
    const {id} = req.params;

    const {error, value} = userSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const {username, email, password} = value;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        const userRespose = user.toJSON();
        delete userRespose.password;

        res.status(200).json(userRespose);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({message: 'Error al actualizar el usuario', error: error.message});
    }
};


exports.deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const deleted = await User.destroy({
            where: {id},
        });
        if (!deleted) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.status(204).json();
    } catch (err) {
        res.status(500).json({message: 'Error al eliminar el usuario'});
    }
};
