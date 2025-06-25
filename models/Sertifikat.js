const mongoose = require('mongoose');

const sertifikatSchema = new mongoose.Schema({
  registrasi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Registrasi' },
  file_sertifikat: { type: String }, // path atau url
  upload_oleh: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Panitia
  tanggal_upload: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Sertifikat', sertifikatSchema);
