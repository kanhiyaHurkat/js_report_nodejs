const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const invoiceRouter = require('./routes/invoice');
const salesRouter = require('./routes/sales');
const orderRouter = require('./routes/orders');
const resumeRouter = require('./routes/resume');
// const registrationRouter = require('./routes/registration');
const cors = require('cors')
require('./db/mongoose')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/invoice', invoiceRouter)
app.use('/sales', salesRouter)
app.use('/order', orderRouter)
app.use('/resume', resumeRouter)
// app.use('/registration', registrationRouter)

const registerRouter = require('./routes/registration/index')

app.use('/registration', registerRouter);

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
localStorage.clear()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
