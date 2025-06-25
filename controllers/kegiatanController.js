const Kegiatan = require('../models/Kegiatan');

// GET semua kegiatan
exports.getAllKegiatan = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.find();
    res.json(kegiatan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST kegiatan baru
exports.createKegiatan = async (req, res, next) => {
  try {
    const kegiatan = await Kegiatan.create(req.body);
    res.status(201).json(kegiatan);
  } catch (error) {
    console.error(error); // << ini biar kebaca di terminal
    next(error);
  }
};


// GET kegiatan by id
exports.getKegiatanById = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findById(req.params.id);
    if (!kegiatan) return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    res.json(kegiatan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE kegiatan by id
exports.deleteKegiatanById = async (req, res) => {
  try {
    const deletedKegiatan = await Kegiatan.findByIdAndDelete(req.params.id);
    if (!deletedKegiatan) return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    res.json({ message: 'Kegiatan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
