const { send } = require('express/lib/response');
const setup = require('../models/User');

class UserController{
    async index(req,res){
        const User = await setup();
        const users = await User.findAll();
        res.json({"message":users});
    }
}
module.exports = new UserController();