var { List } = require('../models/list.model')
var { Task } = require('../models/task.model')

const helper = require('../config/helper');
const { User } = require('../models/user.model');

module.exports.getList = (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
    if (res.locals.isAdmin) {
        List.find({}).then((lists) => {
            res.send(lists);
        }).catch((e) => {
            res.send(e);
        })
    } else {
        List.find({
            _userId: req.user_id
        }).then((lists) => {
            res.send(lists);
        }).catch((e) => {
            res.send(e);
        })
    }
}

module.exports.createList = async (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let user = await User.findById(req.user_id)
    let newList = new List({
        title,
        _userId: req.user_id,
        _email: user.email
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
}

module.exports.updateList = (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    if (res.locals.isAdmin) {
        List.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }).then(() => {
            res.send({ 'message': 'updated successfully by admin' });
        });
    } else {
        List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
            $set: req.body
        }).then(() => {
            res.send({ 'message': 'updated successfully' });
        });
    }

}

module.exports.deleteList = (req, res) => {
    // We want to delete the specified list (document with id in the URL)
    if (res.locals.isAdmin) {
        List.findOneAndRemove({
            _id: req.params.id,
        }).then((removedListDoc) => {
            res.send(removedListDoc);
            helper.deleteTasksFromList(removedListDoc._id);
        })
    } else {
        List.findOneAndRemove({
            _id: req.params.id,
            _userId: req.user_id
        }).then((removedListDoc) => {
            res.send(removedListDoc);

            // delete all the tasks that are in the deleted list
            helper.deleteTasksFromList(removedListDoc._id);
        })
    }

}

module.exports.getAllTaskInList = (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
}

module.exports.createNewTaskInList = (req, res) => {
    // We want to create a new task in a list specified by listId
    if (res.locals.isAdmin) {
        List.findOne({
            _id: req.params.listId,
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can create new tasks
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canCreateTask) => {
            if (canCreateTask) {
                let newTask = new Task({
                    title: req.body.title,
                    _listId: req.params.listId
                });
                newTask.save().then((newTaskDoc) => {
                    res.send(newTaskDoc);
                })
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        List.findOne({
            _id: req.params.listId,
            _userId: req.user_id
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can create new tasks
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canCreateTask) => {
            if (canCreateTask) {
                let newTask = new Task({
                    title: req.body.title,
                    _listId: req.params.listId
                });
                newTask.save().then((newTaskDoc) => {
                    res.send(newTaskDoc);
                })
            } else {
                res.sendStatus(404);
            }
        })
    }

}

module.exports.updateTaskInList = (req, res) => {
    // We want to update an existing task (specified by taskId)
    if (res.locals.isAdmin) {
        List.findOne({
            _id: req.params.listId,
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can make updates to tasks within this list
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canUpdateTasks) => {
            if (canUpdateTasks) {
                // the currently authenticated user can update tasks
                Task.findOneAndUpdate({
                    _id: req.params.taskId,
                    _listId: req.params.listId
                }, {
                    $set: req.body
                }
                ).then(() => {
                    res.send({ message: 'Updated successfully.' })
                })
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        List.findOne({
            _id: req.params.listId,
            _userId: req.user_id
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can make updates to tasks within this list
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canUpdateTasks) => {
            if (canUpdateTasks) {
                // the currently authenticated user can update tasks
                Task.findOneAndUpdate({
                    _id: req.params.taskId,
                    _listId: req.params.listId
                }, {
                    $set: req.body
                }
                ).then(() => {
                    res.send({ message: 'Updated successfully.' })
                })
            } else {
                res.sendStatus(404);
            }
        })
    }

}

module.exports.deleteTaskInList = (req, res) => {
    if (res.locals.isAdmin) {
        List.findOne({
            _id: req.params.listId,
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can make updates to tasks within this list
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canDeleteTasks) => {

            if (canDeleteTasks) {
                Task.findOneAndRemove({
                    _id: req.params.taskId,
                    _listId: req.params.listId
                }).then((removedTaskDoc) => {
                    res.send(removedTaskDoc);
                })
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        List.findOne({
            _id: req.params.listId,
            _userId: req.user_id
        }).then((list) => {
            if (list) {
                // list object with the specified conditions was found
                // therefore the currently authenticated user can make updates to tasks within this list
                return true;
            }

            // else - the list object is undefined
            return false;
        }).then((canDeleteTasks) => {

            if (canDeleteTasks) {
                Task.findOneAndRemove({
                    _id: req.params.taskId,
                    _listId: req.params.listId
                }).then((removedTaskDoc) => {
                    res.send(removedTaskDoc);
                })
            } else {
                res.sendStatus(404);
            }
        });
    }

}