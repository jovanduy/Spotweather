var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var secrets = require('./secrets');

passport.use(new SpotifyStrategy({
	clientID: secrets.SPOTIFY_CLIENT_ID,
    clientSecret: secrets.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://localhost:8888/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
	process.nextTick(function () {
      return done(null, profile);
    });
  }
));

