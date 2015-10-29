/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if(!email || !password) return res.json(401,{err:'Email and password required !'});

    User.findOne({email:email},function(err,user){
        if (err){
          console.log(err);
          return res.json(403,{err : 'forbidden'});
        } 
        if(!user) return res.json(401, 'invalid email or password');

        user.comparePassword(password,user, function(err,valid){
          if (err){
            console.log(err);
            return res.json(403,{err : 'forbidden'});
          } 
          if(!valid) return res.json(401, 'invalid email or password');

          token = JwtHandler.generate({email:user.email,id:user.id});
          user.token = token;

          user.save(function(err){
            if (err) return res.json(403,{err : 'forbidden'});

            return res.json({
              user:user,
              token : token
            });
          });
        });
    });

  },
  refresh : function(req, res){
    var user = req.user || false;

    if (user){
      var decoded = JwtHandler.decode(user.refreshToken);
      if (decoded.email === user.email) {
        token = JwtHandler.generate({email:user.email,id:user.id});
        user.token = token;

        user.save(function(err){
          if (err) return res.json(403,{err : 'forbidden'});

            return res.json({
              user:user,
              token : token
            });
          });
      };
    }
  }

};

/*
  process: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        });
      });
    })(req, res);
  },*/
/**
 * Sails controllers expose some logic automatically via blueprints.	
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for AuthController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 *
 
module.exports.blueprints = {
 
  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,
 
  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,
 
  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true
 
};*/