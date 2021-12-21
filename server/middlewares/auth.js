const jwt = require("jsonwebtoken");

//verify Token

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
            if(err){
                return res.status(403).json({
                    success: false,
                    message:"Invalid token"
                })
            }
            req.user = data
            next();
        })
    } else {
        return res.status(401).json({
            success: false,
            message:"Cant not found accessToken"
        })
    }
}