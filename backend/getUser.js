const {JWT_SEC}=require('./config')
const jwt = require('jsonwebtoken')

async function getUser(req,res,next){
    const user=req.headers.authorization
    const token= user.split(' ')[1]
    const decoded= await jwt.verify(token,JWT_SEC)
    req.userId=decoded.userId
    next()
}
module.exports={getUser}