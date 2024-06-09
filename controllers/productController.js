const path = require('path');
const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const { column, order } = req.query;
    
    if (column && order) {
        // Jika ada parameter sorting, panggil fungsi sort
        Product.sort(column, order, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    } else {
        // Jika tidak ada parameter sorting, panggil fungsi getAll
        Product.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    }
};

exports.addProduct = (req, res) => {
    const { name, description, points_required, weight, stock } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !points_required || !weight || !stock || !image_path) {
        return res.status(400).send('All fields are required');
    }

    Product.create(name, description, points_required, weight, stock, image_path, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Product added successfully');
    });
};

exports.updateProduct = (req, res) => {
    const { name, description, points_required, weight, stock } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : req.body.image_path;

    if (!name || !points_required || !weight || !stock) {
        return res.status(400).send('All fields are required');
    }

    Product.update(req.params.id, name, description, points_required, weight, stock, image_path, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product updated successfully');
    });
};

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product deleted successfully');
    });
};

exports.getProductById = (req, res) => {
    Product.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.searchProducts = (req, res) => {
    const { name } = req.query;
    Product.search(name, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.sortProducts = (req, res) => {
    const { column, order } = req.query;

    console.log('Sort parameters:', column, order); // Log parameters

    if (!column || !order) {
        return res.status(400).send('Column and order parameters are required');
    }

    Product.sort(column, order, (err, results) => {
        if (err) {
            console.error('Error in sort:', err); // Log error
            return res.status(500).send(err);
        }
        console.log('Sort results:', results); // Log results
        res.status(200).json(results);
    });
};


exports.updateStock = (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;

    if (!id || !stock) {
        return res.status(400).send('Product ID and stock are required');
    }

    Product.updateStock(id, stock, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to update stock');
        }
        res.status(200).send('Stock updated successfully');
    });
};

exports.getProductImageById = (req, res) => {
    const { id } = req.params;

    Product.getById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Product not found');

        const product = results[0];
        if (!product.image_path) return res.status(404).send('Image not found');

        const imagePath = path.join(__dirname, '..', product.image_path);
        res.sendFile(imagePath);
    });
};
