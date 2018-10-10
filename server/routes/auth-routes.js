const router =  require('express').Router();
const passport = require('passport');

//Auth Login 
router.get('/login', (req, res) => res.send('hi from login')); 

//Auth with Google
router.get('/logout', (req, res) => res.send('logging out with Google')); //Route is working 

//Auth with Google 
router.get('/google', passport.authenticate('google', {
  scope:['profile']
}));

//Callback route for Google to redirect to
router.get('/google/redirect', (req, res) => {
  res.send('Working here')
});

module.exports = router; 