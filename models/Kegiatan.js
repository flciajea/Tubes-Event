const mongoose = require('mongoose');

const kegiatanSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  waktu: {
    type: String,
    required: true
  },
  lokasi: {
    type: String,
    required: true
  },
  narasumber: {
    type: String,
    required: true
  },
  poster: {
    type: String // URL / path ke gambar
  },
  biayaRegistrasi: {
    type: Number,
    default: 0
  },
  maxPeserta: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['aktif', 'nonaktif'],
    default: 'aktif'
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Kegiatan', kegiatanSchema);
