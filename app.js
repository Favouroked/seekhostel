const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');



const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

const secret = require('./config/secret');

mongoose.connect(secret.database, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.thekey,
    store: new MongoStore({ url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(secret.port, (err) => {
    if (err) throw err;
    console.log("Server is running on port 3000");
});

module.exports = app;
