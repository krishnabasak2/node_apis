require('dotenv').config();
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    const authToken = req.header('authorisation');
    if (authToken) {
        try {
            const user_data = jwt.verify(authToken, process.env.JWT_SECRET);
            req.user = user_data;
            next();
        } catch (error) {
            res.status(401).send({ "status": false, "message": "Unauthorized" });
        }
    } else {
        res.status(401).send({ "status": false, "message": "Unauthorized" });
    }
}

module.exports = { authCheck };