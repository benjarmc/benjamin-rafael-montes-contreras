const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Usuario logeado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', authController.login);


/**
 * @swagger
 * components:
 *   schemas:
 *     User_Create:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Dirección de correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         repeat_password:
 *           type: string
 *           description: Repetir la contraseña para verificar
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User_Create'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post('/signup', authController.signup);


module.exports = router;
