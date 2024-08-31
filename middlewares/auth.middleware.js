import jwt from 'jsonwebtoken';
import AppError from '../Utils/error.util.js';
const isLogedIn = async(req,res,next)=>{
    const {token }= req.cookies;
    if(!token){
        return next( new AppError("Unauthenticated please login again",400))
    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
}

export default isLogedIn