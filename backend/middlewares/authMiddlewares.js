const secret = require("../config")
const jwt = require("jsonwebtoken")
function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization
    console.log(authHeader,authHeader.startsWith('Bearer '))
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1]
    try {
        const verify = jwt.verify(token,secret)
        req.userId = verify.userId;
        next();
    } catch (error) {
        
        res.status(403).json({
            msg:"invalid token"
        })
        return
    }
    

}

module.exports = authMiddleware