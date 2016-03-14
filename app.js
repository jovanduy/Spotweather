var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var index = require('./routes/index');
var weather = require('./routes/weather');
// var SECRETS = require('./secrets.js');

var appKey = process.env.SPOTIFY_CLIENT_ID;
var appSecret = process.env.SPOTIFY_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://spotweather.herokuapp.com/callback'
  },
  function(accessToken, refreshToken, profile, done) {
  	profile.accessToken = accessToken;
  	done(null, profile)
  }));

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){});

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
 });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/playlists/:weather', weather.playlist);
app.get('/:latitude/:longitude', weather.getWeather);
app.get('/user', weather.getUser);
app.listen(process.env.PORT || 3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}