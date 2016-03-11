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

// var client_id = '336855f1efd54d80a47d3c98f929e392'; // Your client id
// var client_secret = '8d688d316a174982a827e3b094955651'; // Your client secret
// var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

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

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/callback', function(req, res) {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;
//         console.log(access_token);
//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log("BODY: ", body);
//         });
//         // we can also pass the token to the browser to make requests from there
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res){});
app.get('/auth/spotify/callback',
    passport.authenticate('spotify', { successRedirect: '/',
                                        failureRedirect: '/' })
);


// app.get('/login', index.login);
// app.get('/callback', index.callback);
app.get('/:latitude/:longitude', weather.getWeather);
app.get('/playlists/:weather', weather.playlist);
app.listen(8888);