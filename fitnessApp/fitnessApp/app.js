const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

// initiating sequelize instance
const sequelize = require('./database/connectors')();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user')(sequelize);
const loginRouter = require('./routes/login')(sequelize);
const logoutRouter = require('./routes/logout')(sequelize);
const registerRouter = require('./routes/register')(sequelize);
const activityRouter = require('./routes/activity')(sequelize);

// init app
var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/logout',logoutRouter);
app.use('/activity',activityRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
