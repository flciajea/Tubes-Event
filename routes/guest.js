const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/Kegiatan');
const Pendaftaran = require('../models/Pendaftaran'); // <-- INI HARUS ADA

// Form pendaftaran event
router.get('/daftar/:id', async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findById(req.params.id);
    if (!kegiatan) return res.status(404).send('Event tidak ditemukan');
    res.render('formPendaftaran', { kegiatan });
  } catch (err) {
    res.status(500).send('Gagal ambil data event');
  }
});

// Halaman history pendaftaran
router.get('/history', async (req, res) => {
  try {
    const pendaftarans = await Pendaftaran.find();
    res.render('historyPendaftaran', { pendaftarans });
  } catch (err) {
    res.status(500).send('Gagal ambil data pendaftaran');
  }
});

module.exports = router;
