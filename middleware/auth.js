const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.body.xauthtoken;

    // Check for token
    if (!token) {
        console.log("NO TOKEN ")
        return res.status(401).json({
            success: false,
            message: 'No Token, Unauthorized Access'
        })
    } else {
        try {
            // Verify token
            const decoded = jwt.verify(token, config.get('JWTSECRET'));

            // Add user from payload
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).json({
                Error: err,
                success: false
            })
        }
    }

}

module.exports = auth;