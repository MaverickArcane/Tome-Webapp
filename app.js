// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

const apiRouter = require('./routes/API');
const authRoutes = require('./routes/login');
const logoutRouter = require('./routes/logout');
const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const moduleRouter = require('./routes/module');


const app = express();
const router = express.Router();

app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1', apiRouter); // Set up the router with the /api/v1 prefix
app.use('/login', authRoutes);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/module', moduleRouter);
app.use('/', indexRouter);

module.exports = app;
