const { ensureAdmin } = require('../middlewares/auth');
router.get('/', ensureAdmin, async (req, res) => {
  // kode ambil data kegiatan
});
