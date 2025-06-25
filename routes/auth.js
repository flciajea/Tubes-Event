// ... yang tadi sudah ada
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET halaman login
router.get('/login', (req, res) => {
  res.render('login');
});

// POST proses login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).send('Email atau password salah');
  }

  req.session.user = {
    id: user._id,
    nama: user.nama,
    role: user.role
  };

  if (user.role === 'admin') {
    res.redirect('/admin/kegiatan');
  } else {
    res.redirect('/guest');
  }
});

// ✅ GET logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Gagal logout');
    }
    res.redirect('/login');
  });
});

module.exports = router;
