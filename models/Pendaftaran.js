const mongoose = require('mongoose');

const pendaftaranSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kegiatan' },
  nama: String,
  email: String,
  noTelp: String,
  pembayaran: String,
  buktiBayar: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pendaftaran', pendaftaranSchema);
