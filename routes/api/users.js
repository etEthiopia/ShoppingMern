const router = require("express").Router();

// User Model
const User = require("../../models/User");

// @Route GET api/users
// @desc GET All Users
// @access Public
router.post("/", async (req, res) => {
    await User.find()
        .then(users => res.send('register'))

        .catch(err => res.json({
            Error: err,
            success: false
        }))
});

// // @Route POST api/users
// // @desc Create an User
// // @access Public
// router.post("/", async (req, res) => {
//     const newUser = new User({
//         name: req.body.name
//     });
//     await newUser
//         .save()
//         .then(user => res.json(user))
//         .catch(err => res.json({
//             Error: err,
//             success: false
//         }))
// });

// // @Route DELETE api/users
// // @desc Delete an User
// // @access Public
// router.delete("/:id", async (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove().then(() => {
//             res.json({
//                 success: true
//             })
//         }).catch(err => res.json({
//             Error: err,
//             success: false
//         })))
//         .catch(err => res.json({
//             Error: err,
//             success: false
//         }))
// });

module.exports = router;