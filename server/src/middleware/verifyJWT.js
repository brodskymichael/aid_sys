import jwt from 'jsonwebtoken';
import "dotenv/config";

const ACCESS_TOKEN_SECRET = "14163637a637dbb5066b90949d2c87eb65081a2203c60e9a29f56c921aa3579eda7825111bc2fadffacb5d2b1bd5e0e235926f2709db2dba480a7b012623d062"
const verifyJWT = (req, res, next) => {
    //const authHeader = req.headers.authorization || req.headers.Authorization
       
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
      
        //const token = authHeader.split(' ')[1]
        const token = req.headers["authorization"];
        console.log(token)
        jwt.verify(
            token,
            ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).json({ message:err })
                req.user = decoded.UserInfo.user
                req.userType = decoded.UserInfo.userType
                next()
            }
        )
}
export { verifyJWT }