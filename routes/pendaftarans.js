const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pendaftaran = require('../models/Pendaftaran');

// upload config kalau perlu
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Submit form pendaftaran
// Submit form pendaftaran
router.post('/submit', upload.single('buktiBayar'), async (req, res) => {
  try {
    const { eventId, nama, email, noTelp, pembayaran } = req.body;
    const pendaftaran = new Pendaftaran({
      eventId, nama, email, noTelp, pembayaran,
      buktiBayar: req.file ? req.file.filename : null
    });
    await pendaftaran.save();
    res.redirect('/history');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Gagal simpan pendaftaran');
  }
});


module.exports = router;
