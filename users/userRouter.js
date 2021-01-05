const router = require("express").Router();
const Users = require("./userModel.js");
const validate = require("../auth/validate.js");

// base URL/api/users

router.use("/:id", validate.user);

// Get Requests
router.get("/", (req, res, next) => {
    Users.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => next({ code: 500, message: "Error retrieving users", err }));
});

// Gety by requests
router.get("/:id", (req, res, next) => {
    const user = req.user;
    res.status(200).json(user);
});

// Put Requests
router.put("/:id", validate.loggedon, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    Users.update(changes, id)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => next({ code: 500, message: "Error updating user data", err }));
});

// Delete Requests
router.delete("/:id", validate.loggedon, (req, res, next) => {
    const { id } = req.params;

    Users.remove(id)
        .then(() => res.status(204).end())
        .catch(err => next({ code: 500, message: "Error removing user data", err }));
});



module.exports = router;