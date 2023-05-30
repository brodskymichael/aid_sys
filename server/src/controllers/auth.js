import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import cookieParser from "cookie-parser"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

//console.log(process.env)
const ACCESS_TOKEN_SECRET="14163637a637dbb5066b90949d2c87eb65081a2203c60e9a29f56c921aa3579eda7825111bc2fadffacb5d2b1bd5e0e235926f2709db2dba480a7b012623d062"
const REFRESH_TOKEN_SECRET= "561f08e59feff7080e5629fc78ff7c490b15fe8ada4ce33bfe064c4fbbf28c3af2a887a41c19e61b29927df5c5051bf96451b25c6bf9050786f4d77dc2cf7519"

const login = asyncHandler(async (req, res)=>{
    const { user, pwd } = req.body
    //console.log(user, pwd)

    if (!user || !pwd) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ user:user })

    //console.log(foundUser)

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    //const match = await bcrypt.compare(pwd, foundUser.pwd)
    let match= false;
    if(pwd===foundUser.pwd){match=true}

    if (!match){
        return res.status(401).json({ message: 'este' })
    }
    //console.log(process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign(
        {
            
            "user": foundUser.user,
            "userType": foundUser.userType
            
        },
        
        ACCESS_TOKEN_SECRET
        
        //{ expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "user": foundUser.user },

        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

     // Create secure cookie with refresh token 
     res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    foundUser.login_today=1;
    foundUser.save()

    // Send accessToken containing username and roles 
    res.json({ message:'Welcome Back!',token:accessToken, refreshToken: refreshToken, user:foundUser })
})

/*const refresh = async (req, res)=>{
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ user: decoded.user }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user": foundUser.user,
                        "userType": foundUser.userType
                    }
                },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}*/

const logout = async (req, res)=>{
    const {_id} = req.body;
    const cookies = req.cookies
    //console.log(cookies)
    if (!cookies) return res.sendStatus(204) //No content
    /*res.clearCookie('_auth')
    res.json({ message: 'Cookie cleared' })*/
    
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
   
    await User.updateOne(
        {_id: _id},
        { $set: {login_today:2}}
    )
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })




}

export { login, logout}