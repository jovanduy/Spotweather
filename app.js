var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var weather = require('./routes/weather');
// var SECRETS = require('./secrets.js'); //uncomment to run locally with your app keys in a file in the top-level directory called secrets.js
// var appKey = SECRETS.SPOTIFY_CLIENT_ID; 
// var appSecret = SECRETS.SPOTIFY_CLIENT_SECRET;


// It would be better to seperate the logic of your authentication process and API use
var appKey = process.env.SPOTIFY_CLIENT_ID;	//these keys are stored in heroku config in our deployed version of spotweather
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
  	profile.accessToken = accessToken;	//we add the access token to the profile so that server can make more requests to spotify using access token in req.user
  	done(null, profile)
  }));

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 	//copied from olinjs example code using sessions
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),	//href links here to begin oauth flow for log in with spotify
  function(req, res){});

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),	//redirect to / on failure because we check if req.user exists before changing display client-side, don't have failed log in page
  function(req, res) {
    res.redirect('/');	//same as above when successfully logged in
 });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/playlists/:weather', weather.playlist);
app.get('/:latitude/:longitude', weather.getWeather);
app.get('/user', weather.getUser);
app.listen(process.env.PORT || 8888);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}