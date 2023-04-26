const { send } = require('express/lib/response');
const setup = require('../models/User');
const moment = require('moment');
const Joi = require('joi');
class UserController{
    async index(req,res){
        const User = await setup();
        const users = await User.findAll();
        res.json({"message":users});
    }
    async addUser(req,res){
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            createdAt: Joi.date().iso().required(),
            updatedAt: Joi.date().iso().optional().allow(null)
        });
        
        // Validate and sanitize the request body
        let date = new Date();
        const isoDate = moment(date).toISOString();
        req.body.createdAt = isoDate;
        const { error, value } = schema.validate(req.body, { stripUnknown: true });
        
        if (error) {
            console.log('Error while validating request body', error);
            return res.status(400).json({ error: error.details[0].message });
        }
        
        // Create a new user using the validated and sanitized request body
        const User = await setup();
        const build = User.build(
            {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                createdAt:isoDate,
                updatedAt:null
            }
        );
        
        build.save().then((savedUser) => {
            return res.json({
                message: 'You have added a user successfully'
            });
        }).catch((error) => {
            console.log('Error while saving user', error);
        });
    }
    // find user by id 
    async findOne(req,res){
        const {id} = req.params;
        const User = await setup();
        User.findOne({ where: { id: id }})
        .then((user) => {
            if (!user) {
            console.log('User not found!');
            } else {
              res.json({"data":user})
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    async updateUser(req,res){
      const {id} = req.params;
      const User = await setup();
      let date = new Date();
      const isoDate = moment(date).toISOString();
      const {name,email,password,createdAt,updatedAt} = req.body;
      console.log("hello")
        User.update({
          name:name,
          email:email,
          password:password,
          createdAt:null,
          updatedAt:isoDate
        },{
            where: {
            id: id
            }
        }).then(() => {
           return res.json({
            'message':"Record updated successfully!"
           })
        }).catch((error) => {
            console.error('Error updating record: ', error);
        });
    }
}
module.exports = new UserController();