const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
    // Di sini, Anda dapat mengakses req.user untuk mendapatkan ID pengguna yang terautentikasi
    // Misalnya, jika Anda ingin mengirimkan kembali informasi profil pengguna
    // dari database, Anda dapat melakukan query menggunakan ID pengguna ini
    // dan mengirimkan respons sesuai dengan data profil yang ditemukan.

    res.json({ message: 'This is the profile page', userId: req.user });
});

module.exports = router;
