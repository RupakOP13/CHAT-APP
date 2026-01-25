import jwt from 'jsonwebtoken';

const generateTokenandSetCookie =(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true  , //prevent client side js access
        sameSite:"strict" ,//CSRF protection
        secure:process.env.NODE_ENV!=='development'//set secure flag in production
    })
}
export default generateTokenandSetCookie;