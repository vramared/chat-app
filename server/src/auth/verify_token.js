const jwt = require('jsonwebtoken');

const httpResp = {
    accessDenied: 'Access Denied',
    badToken: 'Invalid Token',
};

var verifyToken = function (req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).send(httpResp.accessDenied);
    const token = req.headers.authorization.split(' ')[1];
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (err) {
        res.status(401).send(httpResp.badToken);
    }
};

module.exports = verifyToken;
