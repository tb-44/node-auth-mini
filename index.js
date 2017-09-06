const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
//MASSIVE RIGHT HERE
//BODY PARSER RIGHT HERE

//MUST BE DONE IN THIS ORDER!!
app.use( session({
  secret: 'sup dude',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser(function(user, done) {
  //GETS USER FROM AUTH0 PROFILE
  var userInfo = {
    id: user.id,
    display: user.displayName,
    nickname: user.nickname,
    email: user.email
  }
  done(null, userInfo)
});

passport.deserializeUser(function(user, done) {
  done(null, user); //PUTS ON req.user
});

app.get('/login', passport.authenticate('auth0', {
  successRedirect: '/me',
  failureRedirect: '/',
  failureFlash: true
}));

app.get('/me', function(req, res, next){
  res.json(req.user)
})


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
