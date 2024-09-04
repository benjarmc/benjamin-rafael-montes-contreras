const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: decimal
 *           description: Precio del producto
 *         height:
 *           type: number
 *           format: decimal
 *           description: Altura del producto
 *         length:
 *           type: number
 *           format: decimal
 *           description: Largo del producto
 *         width:
 *           type: number
 *           format: decimal
 *           description: Ancho del producto
 */

/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *          description: Producto creado exitosamente
 *       400:
 *          description: Error de validación
 *       500:
 *          description: Error en el servidor
 */
router.post('', authMiddleware, productController.createProduct);

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos registrados.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error en el servidor
 */
router.get('', authMiddleware, productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto basado en su ID.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', authMiddleware, productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     description: Actualiza los datos de un producto basado en su ID.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     description: Elimina un producto basado en su ID.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
