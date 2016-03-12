var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session')
var request = require('request'); // "Request" library
var querystring = require('querystring');
var passport = require('passport');
var mongoose = require('mongoose');

var stateKey = 'spotify_auth_state';

var index = require('./routes/index');
var weather = require('./routes/weather');
var spotifyAuth = require('./authentication.js');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: 'superS3CRE7',
    resave: false,
    saveUninitialized: false ,
    cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // done(null, user._id);
  done(null, user);
});
passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user){
    //     console.log(user);
    //     if(!err) done(null, user);
    //     else done(err, null);
    // });
	done(null, id);
});

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res){});
app.get('/callback',
    passport.authenticate('spotify', { successRedirect: '/',
                                        failureRedirect: '/' })
);


// app.get('/login', index.login);
// app.get('/callback', index.callback);
app.get('/:latitude/:longitude', weather.getWeather);
app.get('/playlists/:weather', weather.playlist);
app.listen(8888);