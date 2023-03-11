const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth=(req, res, next)=>{
    const token = req.cookies.JavaScriptObjectNotationWebTokenCookie;

    //is there a JSON Web Token and is it unadultered?
    if(token){
        jwt.verify(token, 'iamahacker', (erred, decodedToken)=>{
            if(erred){
                console.log(erred.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

// get the current user's info to use in cool places on views as view variables
const checkUser = (req, res, next) =>{
    const token = req.cookies.JavaScriptObjectNotationWebTokenCookie;
    if(token){
        jwt.verify(token, 'iamahacker', async (erred, decodedToken)=>{
            if(erred){
                console.log(erred.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })

    }else{
        res.locals.user = null;
        next();
    }
}
module.exports = {requireAuth, checkUser};