const Joi = require('joi');
const {Product} = require('../models');

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
    }),
    description: Joi.string().allow(''),
    price: Joi.number().precision(2).required().messages({
        'number.base': 'El precio debe ser un número',
        'number.empty': 'El precio es obligatorio',
    }),
    height: Joi.number().precision(2).optional(),
    length: Joi.number().precision(2).optional(),
    width: Joi.number().precision(2).optional(),
});

exports.createProduct = async (req, res) => {
    console.log("body: " + req.body);

    const {error, value} = productSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        let {name, description, price, height, length, width} = value;

        const product = await Product.create({
            name,
            description,
            price,
            height,
            length,
            width,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: 'Error al crear el producto', error: error.message});
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los productos', error: error.message});
    }
};

exports.getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el producto', error: error.message});
    }
};

exports.updateProduct = async (req, res) => {
    const {id} = req.params;

    const {error, value} = productSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        let {name, description, price, height, length, width} = value;

        const [updated] = await Product.update({name, description, price, height, length, width}, {
            where: {id},
        });
        if (!updated) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el producto', error: error.message});
    }
};

exports.deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await Product.destroy({
            where: {id},
        });
        if (!deleted) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el producto', error: error.message});
    }
};
