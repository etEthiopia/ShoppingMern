const router = require("express").Router();
const bcrypt = require('bcryptjs');

// User Model
const User = require("../../models/User");

// @Route GET api/users
// @desc GET All Users
// @access Public
router.post("/", async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    // Simple Validation
    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: 'All fields are not available.'
        })
    }

    await User.findOne({
            email
        })
        .then(user => {
            if (user) {
                res.status(400).json({
                    success: false,
                    message: 'A user is already registered with that email.'
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                // Create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            })
                    })
                })
            }
        })
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