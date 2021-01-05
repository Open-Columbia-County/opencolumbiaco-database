const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets');

const Users = require('./userModel');
const validate = require('../auth/validate');

// all has /api/auth in front

router.post("/register", validate.register, (req, res, next) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(newUser => {
            const token = generateToken(newUser);
            res.status(201).json({'User created': user.username, 'User Role': user.role, token});
        })
        .catch(err => next({ code: 500, message: "Error creating user", err }));
});
router.post("/login", validate.login, (req, res, next) => {
    const user = req.user;

    const token = generateToken(user);
    res.status(200).json({ Welcome: 'Welcome ' + user.firstName + ' ' + user.lastName + ' Your role is ' + user.role, token });

});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        created_at: Date.now()
    };

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;