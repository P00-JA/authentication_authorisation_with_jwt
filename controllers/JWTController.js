const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTController = {
  createToken(payload,refresh = false){
    console.log("process",process.env.SECRET)
    const accessToken = jwt.sign(payload, process.env.SECRET, { 
      expiresIn: 60*60 
    });
    return {
        access_token : accessToken,
        refresh_token : refresh ? jwt.sign(payload, process.env.SECRET, { 
          expiresIn: 30*24*60*60,
        }):null,
      };
  },

  verifyToken(token){
    try{
      const decoded = jwt.verify(token,process.env.SECRET);
      return decoded;
    }catch(error){
      return false;
    }
  },

  verifyAccessToken(req,res,next){
    const headers = req.headers;
    if(!headers['authorization']){
      res.status(405).json({message: "token not provided"});
    }
    const token = headers['authorization'].split(" ")[1];

    if(!this.verifyToken(token)){
      res.status(405).json({message:"invalid token"});
    }else{
      next()
    }
  },

  grantNewAccessToken(req,res){
    const cookieParser = (cookieName,cookies)=>{
      const cookieArr = cookies.split("; ");
      console.log(cookieArr);
      let requiredCookie = cookieArr.filter(cookie=> cookie.indexOf(cookieName)==0)[0];
      console.log(requiredCookie);
      let ourCookie = requiredCookie.split('=')[1];
      console.log(ourCookie);
      return ourCookie;
    }
    let token = cookieParser("refresh_token",req.headers.cookie);
    let decoded = this.verifyToken(token);
    console.log(decoded);
    if(!decoded){
      res.status(404).json({message:"invalid token"});
    }else{
       let newToken = this.createToken({email:decoded.email},false);
       console.log(newToken);
       res.json({access_token : newToken.access_token})
    }
  }
}

module.exports = JWTController;