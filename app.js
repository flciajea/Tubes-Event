const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/database');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Connect ke database
connectDB();

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: 'kegiatan_app_secret_key_2024',
  resave: false,
  saveUninitialized: true
}));

// Logger & security
app.use(morgan('dev'));
app.use(helmet());

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Middleware supaya session bisa dipakai di semua view
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Import model
const Kegiatan = require('./models/Kegiatan');

// Routes
const userRoutes = require('./routes/users');
const kegiatanRoutes = require('./routes/kegiatans');
const authRoutes = require('./routes/auth');
const adminKegiatanRoutes = require('./routes/adminKegiatan');
const adminRoutes = require('./routes/admin');
const guestRoutes = require('./routes/guest');
const pendaftaranRoutes = require('./routes/pendaftarans');

// API routes
app.use('/api/users', userRoutes);
app.use('/api/kegiatans', kegiatanRoutes);
app.use('/api/pendaftarans', pendaftaranRoutes);

// Halaman public
app.use('/', authRoutes);
app.use('/', guestRoutes);

// Halaman admin
app.use('/admin/kegiatan', adminKegiatanRoutes);
app.use('/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'API Kegiatan MongoDB siap digunakan!',
    timestamp: new Date()
  });
});

// Test DB connection
app.get('/test', async (req, res) => {
  try {
    const User = require('./models/User');
    const users = await User.find().limit(5);
    res.json({
      message: 'Database connected successfully!',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Guest lihat daftar event
app.get('/guest', async (req, res) => {
  try {
    const kegiatans = await Kegiatan.find();
    res.render('index', { kegiatans });
  } catch (err) {
    res.status(500).send('Error mengambil data event');
  }
});

// Registrasi member
app.get('/register', (req, res) => {
  res.render('register');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Terjadi kesalahan server!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route tidak ditemukan!'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log(`📡 API tersedia di http://localhost:${PORT}`);
});
