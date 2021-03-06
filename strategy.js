const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);

module.exports = new Auth0Strategy({
   domain:       config.domain,
   clientID:     config.clientID,
   clientSecret: config.clientSecret,
   callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //This function always gets these parameters!!
    return done(null, profile);
  }
);
