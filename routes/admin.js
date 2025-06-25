const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/Kegiatan');

// GET semua kegiatan
router.get('/kegiatan', async (req, res) => {
  try {
    const kegiatans = await Kegiatan.find();
    res.render('admin/kegiatan', { kegiatans });
  } catch (err) {
    res.status(500).send('Gagal ambil data');
  }
});

const User = require('../models/User');

// Halaman login admin
router.get('/login', (req, res) => {
  res.render('loginAdmin');
});

// Proses login admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, password, role: 'admin' });

    if (!admin) {
      return res.send('Email atau password salah, atau bukan admin.');
    }

    // Simpan data admin ke session
    req.session.adminId = admin._id;
    res.redirect('/admin/kegiatan');
  } catch (err) {
    res.status(500).send('Error login: ' + err.message);
  }
});

// Logout admin
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;

// Tambah, Edit, Delete bisa lanjut ntar

module.exports = router;
