const mongoose = require('mongoose');

const presensiSchema = new mongoose.Schema({
  registrasi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Registrasi' },
  waktu_presensi: { type: Date, default: Date.now },
  di_scan_oleh: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Panitia
}, { timestamps: true });

module.exports = mongoose.model('Presensi', presensiSchema);
