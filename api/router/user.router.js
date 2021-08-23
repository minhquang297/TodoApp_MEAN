var express = require('express');

var controller = require('../controllers/user.controller');
var router = express.Router();
var authMiddleware = require('../middlewares/auth.middleware');

/**
 * POST /users
 * Purpose: Sign up
 */
router.post('/', controller.signUp)

/**
 * POST /users/login
 * Purpose: Login
 */
router.post('/login', controller.login)


/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
router.get('/me/access-token', authMiddleware.verifySession, controller.generateAccessToken)

module.exports = router;