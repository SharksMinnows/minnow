const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys.js')

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID, 
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
  },
  function(accessToken, refreshToken, profile, done) {  
    console.log(profile)
    return done(err, user) 
  })
);
