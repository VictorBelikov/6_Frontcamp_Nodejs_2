const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fileLogger = require('./api/middleware/fileLogger');
const globaErrHandler = require('./api/middleware/errorHandler');

const newsRoutes = require('./api/routes/news');

const app = express();

app.set('view engine', 'ejs'); // our template engine
app.set('views', 'src/api/views'); // where our views are stored

// Specify our static files will not be processed by routes
app.use(express.static(path.join(__dirname, 'api/public')));

// Logs request params to the console, then always calls next().
app.use(morgan('dev'));

// Our custom filelogger.
app.use(fileLogger);

// We can use req.body... & etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/news', newsRoutes);

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
