var express = require('express');

var controller = require('../controllers/admin.controller');
var router = express.Router();

/**
 * GET /admin/user
 * Purpose: get all user
 */
router.get('/user', controller.getAllUser)

/**
 * GET /admin/user/:id
 * Purpose: get a user
 */
router.get('/user/:id', controller.getUser)

/**
 * POST /admin/user
 * Purpose: Create a user
 */
router.post('/user', controller.createUser)

/**
 * GET /user/:id
 * Purpose: update users
 */
router.patch('/user/:id', controller.updateUser)

/**
 * GET /user/:id
 * Purpose: delete users
 */
router.delete('/user/:id', controller.deleteUser)

module.exports = router;