const { send } = require('express/lib/response');
const setup = require('../models/User');
const moment = require('moment');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    // login method
    async login(req, res) {
    const { email, password } = req.body;
    const User = await setup();
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }
  
      const token = jwt.sign(
        { user: { id: user.id, name: user.name, email: user.email } },
        'secret',
        { expiresIn: '3h' }
      );
      return res.json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'An error occurred while logging in',
      });
    }
  }
  
  // sign up method
  async  signup(req, res) {
    const { name, email, password } = req.body;
  
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      createdAt: Joi.date().iso().required(),
      updatedAt: Joi.date().iso().optional().allow(null),
    });
  
    // Validate and sanitize the request body
    const isoDate = moment().toISOString();
    req.body.createdAt = isoDate;
    const bcryptPass = password;
    const saltRounds = 10;
    try {
      const afterhashPass = await bcrypt.hash(bcryptPass, saltRounds);
      const { error, value } = schema.validate(req.body, { stripUnknown: true });
  
      if (error) {
        console.log('Error while validating request body', error);
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Create a new user using the validated and sanitized request body
      const User = await setup();
      const build = User.build({
        name: name,
        email: email,
        password: afterhashPass,
        createdAt: isoDate,
        updatedAt: null,
      });
  
      await build.save();
      return res.json({ message: 'you have signed up successfully' });
    } catch (error) {
      console.log('Error while sign up', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
   async deleteUser(req,res){
        const User = await setup();
        const {id} = req.params;
        User.destroy({
            where: {
              id:id
            }
        }).then(()=>{
            res.json({
                'message':"delete user successfully"
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}
module.exports = new UserController();