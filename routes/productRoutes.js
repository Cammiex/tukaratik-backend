const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Konfigurasi multer untuk menyimpan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder untuk menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // nama file unik
    }
});

const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.post('/', upload.single('image'), productController.addProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
// router.get('/sort', productController.sortProducts);
router.put('/:id/update-stock', productController.updateStock);
router.get('/:id/image', productController.getProductImageById);

module.exports = router;
