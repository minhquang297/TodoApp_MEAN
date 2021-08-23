var express = require('express');

var controller = require('../controllers/list.controller');
var router = express.Router();

/**
 * GET /lists
 * Purpose: Get all lists
 */
router.get('/', controller.getList)

/**
 * POST /lists
 * Purpose: Create a list
 */
router.post('/', controller.createList)

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
router.patch('/:id', controller.updateList);

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
router.delete('/:id', controller.deleteList);


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
router.get('/:listId/tasks', controller.getAllTaskInList);


/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
router.post('/:listId/tasks', controller.createNewTaskInList)

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
router.patch('/:listId/tasks/:taskId', controller.updateTaskInList);

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
router.delete('/:listId/tasks/:taskId', controller.deleteTaskInList);

module.exports = router;