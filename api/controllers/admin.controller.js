const { User } = require("../models/user.model");

module.exports.getAllUser = (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
    if (res.locals.isAdmin) {
        User.find({}).then((users) => {
            res.send(users);
        }).catch((e) => {
            res.send(e);
        })
    } else {
        res.status(401).send('Deo phai admin ?');
    }
}

module.exports.createUser = (req, res) => {
    if (res.locals.isAdmin) {
        let body = req.body;
        let newUser = new User(body);
        newUser.save().then((newUser) => {
            res.send(newUser);
        })
    } else {
        res.status(401).send('Deo phai admin ?');
    }
}

module.exports.updateUser = (req, res) => {
    if (res.locals.isAdmin) {
        User.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }).then(() => {
            res.send({ 'message': 'updated successfully by admin' });
        });
    } else {
        res.status(401).send('Deo phai admin ?');
    }
}

module.exports.deleteUser = (req, res) => {
    if (res.locals.isAdmin) {
        User.findOneAndRemove({
            _id: req.params.id,
        }).then((removedUser) => {
            res.send(removedUser);
        })
    } else {
        res.status(401).send('Deo phai admin ?');
    }
}

module.exports.getUser = (req, res) => {
    if (res.locals.isAdmin) {
        User.findOne({
            _id: req.params.id,
        }).then((user) => {
            res.send(user);
        })
    } else {
        res.status(401).send('Deo phai admin ?');
    }
}



