module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const AccessToken = Nodal.require('app/models/access_token.js');

  class UserLoginMiddleware {

    exec(controller, callback) {

      AccessToken.verify(controller.params, (err, accessToken, user) => {

        if (err) {
          return callback(err);
        }

        controller.params.accessToken = accessToken;
        controller.params.user = user;
        callback();

      });

    }

  }

  return UserLoginMiddleware;

})();
