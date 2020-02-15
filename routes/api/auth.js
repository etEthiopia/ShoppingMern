const router = require("express").Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require("../../models/User");

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
                                    expiresIn: 3600
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



module.exports = router;