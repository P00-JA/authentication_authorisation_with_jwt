const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTController = {
    createToken(payload,refresh=false){
      const accessToken =  jwt.sign({
            exp: 10,
            data: payload
          }, process.env.SECRET);

      return {
        access_token : accessToken,
        refresh_token : refresh ? jwt.sign({
            exp: 30*24*60*60,
            data: payload
        }, process.env.SECRET):null
      }
    },
    verifyToken(token){
        try{
          const decoded = jwt.verify(token,process.env.SECRET)
          return decoded;
        }catch(error){
          return false;
        }
    }
}

module.exports = JWTController;