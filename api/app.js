var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testApi");
var orderRouter = require('./routes/order');
var customerRouter=require("./routes/customer");
var viewRouter=require("./routes/vieworder");
var alreadyRouter=require("./routes/alreadycustomer")
var loginRouter=require("./routes/login");
var getCustomerRouter=require("./routes/getcustomer");
var deleteOrderRouter=require("./routes/deleteorder");
var subviewRouter=require("./routes/suborders");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/order", orderRouter);
app.use("/customer",customerRouter);
app.use("/vieworder",viewRouter);
app.use("/alreadycustomer",alreadyRouter);
app.use("/login",loginRouter);
app.use("/getcustomer",getCustomerRouter);
app.use("/deleteorder",deleteOrderRouter);
app.use("/suborders",subviewRouter);
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
