const router = require("express").Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require("../../models/User");

// Auth Middleware
const auth = require("../../middleware/auth");


// @Route GET api/auth
// @desc Auth user
// @access Public
router.post("/", async (req, res) => {
    const {

        email,
        password
    } = req.body;

    // Simple Validation
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'All fields are not available.'
        })
    }

    await User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: 'user doesnot exist.'
                })
            } else {
                // Validate Password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.status(400).json({
                                success: false,
                                message: 'Invalid Credientials.'
                            })
                        } else {
                            jwt.sign({
                                    id: user.id
                                },
                                config.get('JWTSECRET'), {
                                    expiresIn: "1d"
                                },
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        },
                                        success: true
                                    })
                                }
                            )
                        }
                    })
                    .catch(err => res.json({
                        Error: err,
                        success: false
                    }))
            }


        })
        .catch(err => res.json({
            Error: err,
            success: false
        }))


});


// @Route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})


module.exports = router;