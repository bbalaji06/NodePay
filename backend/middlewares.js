const {JWT_SEC}=require('./config')
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authheader = req.headers.authorization

    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"Token error"
        });
    }

    const token = authheader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SEC)

        req.userId = decoded.userId
        next()

    }
    catch (err) {
       return res.status(401).json({
            message:"Unauthorized User"
        })
    }

}

module.exports = { authMiddleware }