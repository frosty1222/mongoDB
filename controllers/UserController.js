const { send } = require('express/lib/response');
const setup = require('../models/User');
class UserController{
    async index(req,res){
        const User = await setup();
        const users = await User.findAll();
        res.json({"message":users});
    }
    async addUser(req,res){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        const { name, email, password,createdAt,updatedAt} = req.body;
        req.createdAt = today;
        req.updatedAt = '';
        const User = await setup();
        const build = User.build({
            name:name,
            email:email,
            password:password,
            createdAt:createdAt,
            updatedAt:updatedAt
        });
        if(build){
            return res.json({
                message:'you have added a user successfully'
            })
        }
    }
}
module.exports = new UserController();