const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
require("dotenv/config")


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLESECRET, 
    callbackURL: '/auth/google/redirect',
  },
  function(accessToken, refreshToken, profile, done) {  
    console.log(profile)
    return done(err, user) 
  })
);
