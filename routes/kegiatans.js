const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/Kegiatan');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Tambah event baru dengan upload poster
router.post('/', upload.single('poster'), async (req, res) => {
  try {
    const newKegiatan = new Kegiatan({
      nama: req.body.nama,
      tanggal: req.body.tanggal,
      waktu: req.body.waktu,
      lokasi: req.body.lokasi,
      narasumber: req.body.narasumber,
      poster: req.file ? req.file.filename : null,
      biayaRegistrasi: req.body.biayaRegistrasi,
      maxPeserta: req.body.maxPeserta
    });
    const savedKegiatan = await newKegiatan.save();
    res.status(201).json(savedKegiatan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan kegiatan', error: error.message });
  }
});

module.exports = router;
