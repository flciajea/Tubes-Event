const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/Kegiatan');
const multer = require('multer');

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// GET daftar kegiatan
router.get('/', async (req, res) => {
  const kegiatans = await Kegiatan.find();
  res.render('admin/kegiatan', { kegiatans });
});

// GET form tambah
router.get('/tambah', (req, res) => {
  res.render('admin/tambahKegiatan');
});

// POST simpan kegiatan baru
router.post('/tambah', upload.single('poster'), async (req, res) => {
  try {
    const { nama, tanggal, waktu, lokasi, narasumber, biayaRegistrasi, maxPeserta } = req.body;

    const newEvent = new Kegiatan({
      nama, tanggal, waktu, lokasi, narasumber,
      biayaRegistrasi, maxPeserta,
      poster: req.file ? req.file.filename : null
    });

    await newEvent.save();
    res.redirect('/admin/kegiatan');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menyimpan kegiatan');
  }
});

// GET form edit kegiatan
router.get('/edit/:id', async (req, res) => {
  const kegiatan = await Kegiatan.findById(req.params.id);
  res.render('admin/editKegiatan', { kegiatan });
});

// POST update kegiatan
router.post('/edit/:id', upload.single('poster'), async (req, res) => {
  try {
    const { nama, tanggal, waktu, lokasi, narasumber, biayaRegistrasi, maxPeserta } = req.body;
    const updateData = { nama, tanggal, waktu, lokasi, narasumber, biayaRegistrasi, maxPeserta };

    if (req.file) {
      updateData.poster = req.file.filename;
    }

    await Kegiatan.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/admin/kegiatan');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal update kegiatan');
  }
});

// POST hapus kegiatan
router.post('/hapus/:id', async (req, res) => {
  try {
    await Kegiatan.findByIdAndDelete(req.params.id);
    res.redirect('/admin/kegiatan');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal hapus kegiatan');
  }
});

module.exports = router;
