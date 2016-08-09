'use strict';

const Nodal = require('nodal');
const router = new Nodal.Router();

/* Middleware */
/* executed *before* Controller-specific middleware */

const CORSMiddleware = Nodal.require('middleware/cors_middleware.js');
// const CORSAuthorizationMiddleware = Nodal.require('middleware/cors_authorization_middleware.js');
// const ForceWWWMiddleware = Nodal.require('middleware/force_www_middleware.js');
// const ForceHTTPSMiddleware = Nodal.require('middleware/force_https_middleware.js');

router.middleware.use(CORSMiddleware);
// router.middleware.use(CORSAuthorizationMiddleware);
// router.middleware.use(ForceWWWMiddleware);
// router.middleware.use(ForceHTTPSMiddleware);

/* Renderware */
/* executed *after* Controller-specific renderware */

const GzipRenderware = Nodal.require('renderware/gzip_renderware.js')

router.renderware.use(GzipRenderware);

/* Routes */
const IndexController = Nodal.require('app/controllers/index_controller.js');

const UsersController = Nodal.require('app/controllers/users_controller.js');
const PokemonJsonsController = Nodal.require('app/controllers/pokemon_jsons_controller.js');
const AccessTokensController = Nodal.require('app/controllers/access_tokens_controller.js');

router.route('/pokemon_jsons/{id}').use(PokemonJsonsController);
router.route('/users/{id}').use(UsersController);
router.route('/access_tokens/{id}').use(AccessTokensController);

/* generator: end routes */

module.exports = router;
