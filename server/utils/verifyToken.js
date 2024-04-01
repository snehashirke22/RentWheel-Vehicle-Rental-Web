import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.redirect('/login');
    }

    jwt.verify(token,process.env.SECRET_KEY, (err, user) =>{
        if (err) return res.redirect('/login');
        req.user = user;
        next()
});
};

export const verifyUser = (req, res, next) => {
    verifyToken(req,res, ()=>{
        if(req.user.id == req.params.id){
            next();
        }
        else{
            return next(createError(403, "You are not authorized!"));
        }
    });
};
