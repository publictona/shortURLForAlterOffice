const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
//const RedisStore = require('connect-redis')(session);
const redis = require('ioredis');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { rateLimiter } = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

const analyticsRoutes = require('./routes/analyticsRoutes');
const RedisStore = require('connect-redis').default; // Use `.default` for the correct export

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Set up the session store
// app.use(session({
//   store: new RedisStore({
//     host: 'localhost',  // or the Redis server you are using
//     port: 6379,         // the Redis port
//     // You can add other Redis options here as needed
//   }),
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
// }));


// Session and Redis Setup
// const redisClient = new redis({
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: process.env.REDIS_PORT || 6379,
// });
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Passport Setup
// require('./utils/passportSetup');
// app.use(passport.initialize());
// app.use(passport.session());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/shortUrl", {})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/shorten', urlRoutes);
//app.use('/shorten', rateLimiter, urlRoutes);
app.use('/analytics', analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export app for testing
module.exports = app;