const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./api/config/passport-config');

const queryLogger = require('./api/middleware/queryLogger');
const globaErrHandler = require('./api/middleware/errorHandler');
const newsRoutes = require('./api/routes/news');
const usersRoutes = require('./api/routes/users');

const app = express();

mongoose.connect(
  `mongodb+srv://V1ctoR:${process.env.MONGO_ATLAS_PW}@frontcamp-news-oslhg.mongodb.net/${process.env.MONGO_ATLAS_DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

app.set('view engine', 'ejs'); // our template engine
app.set('views', 'src/api/views'); // where our views are stored

// Specify our static files will not be processed by routes
app.use(express.static(path.join(__dirname, 'api/public')));

// Logs request params to the console, then always calls next().
app.use(morgan('dev'));

// Our custom filelogger.
app.use(queryLogger);

// We can use req.body... & etc.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session params
app.use(session({ secret: 'SESSION_SECRET', resave: false, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/news', newsRoutes);
app.use('/user', usersRoutes);

// Will reach this line only if no one of the routes is processed.
app.use((req, res, next) => {
  console.log('!! In the error callback !!');
  const err = new Error('Not found');
  err.status = 404;
  next(err); // throw error to the next middleware below
});

// Will catch all errors in the app and send them to the client using "ejs" view engine.
app.use(globaErrHandler);

module.exports = app;
