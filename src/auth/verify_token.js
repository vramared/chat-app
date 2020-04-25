const jwt = require('jsonwebtoken');

const httpResp = {
    accessDenied: "Access Denied",
    badToken: "Invalid Token"
}

var verifyToken = function(req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send(httpResp.accessDenied);
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (err) {
        res.status(401).send(httpResp.badToken);
    }
}

module.exports = verifyToken;