const { where } = require('sequelize');
const UserData = require('../models/UserData');
const bcrypt = require('bcrypt');
const HomeController = {
    async register (req, res){
        try {
          let user = await UserData.findOne({ where: { email: req.body.email } });
          if (user) {
            return res.status(409).json({ errors: { message: "User account already exists!" } });
          }
      
          const hashPassword = bcrypt.hashSync(req.body.password, 10);
          user = await UserData.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
          });
      
          res.json({'UserData' : user});
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Server error' });
        }
    },
    async login (req,res){
        try {
            let user = await UserData.findOne({ where: { email: req.body.email } });
            if (!user) {
              return res.status(409).json({ errors: { message: "Please register" } });
            }
            if(bcrypt.compareSync(req.body.password,user.password)){
                res.json({'UserData' : {
                  id: user.id,
                  firstName: user.firstName,
                  lastName:user.lastName,
                  email:user.email
                }});
            }else{
                res.status(404).json({errors:{m}})
            }
          } catch (error) {
            console.error('Error in logging in:', error);
            res.status(500).json({ message: "incorrect Password!" });
          }
    },
    async updateUser(req,res){
        const body = req.body;
        for(let key in body){
            if(key == "password" || key == "email"){
                delete body[key];
            }else if(body[key]== null || body[key] === undefined){
                delete body[key];
            }
        }
        let user = await UserData.update(body,{where:{id:req.params.id}});
        if(user){
            res.status(200).json({message:'user updated successfully'});
        }
    },
    async getUser(req,res){
        let user = await UserData.findByPk(req.params.id);
        if(!user){
            res.status(404).json({errors:{message:"user not found"}});
        }else{
            res.json({'UserData' : {
                id: user.id,
                firstName: user.firstName,
                lastName:user.lastName,
                email:user.email
              }});
        }
    },
    async deleteUser(req,res){
        let user = await UserData.findByPk(req.params.id);
        if(!user){
            res.status(404).json({errors:{message:"user not found"}});
        }else{
            await UserData.destroy({
                where: {
                  id: req.params.id
                },
              });
            res.status(200).json({message:"user deleted successfully"})  
        }
    }
}

module.exports = HomeController;