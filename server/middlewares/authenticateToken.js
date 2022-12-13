const jwt = require('jsonwebtoken');

// Token Function
// token middleware that make sure to show products on valid user
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send("No Token");

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) return res.json({ message: "Invalid Token" });
        req.user = user;
        return next();
    })
}

module.exports = { authenticateToken }