const { send } = require('express/lib/response');
const role = require('../models/Role');
const moment = require('moment');
const Joi = require('joi');
let date = new Date();
const isoDate = moment(date).toISOString();
class RoleController{
    async index(req,res){
        const Role = await role();
        const data = await Role.findAll();
        res.json({
            'data':data
        })
    }
    async addRole(req,res){
      const Role = await role();
      const {name,user_id} = req.body;
      const build = Role.build({
        name:name,
        user_id:user_id,
        createdAt:null,
        updatedAt:null
      })
      build.save().then(response=>{
          res.json({
            success:true,
            message:'Add Role Successfully',
          })
      }).catch(err=>{
        res.json({
            err:err
        })
      })
    }
    async deleteRole(req,res){
        const Role = await role();
        const {id} = req.params
        Role.destroy({
            where: {
              id:id
            }
        }).then(()=>{
            res.json({
                'message':"delete role successfully"
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    async getRoleById(req,res){
        const Role = await role();
        const {id} = req.params
        Role.findOne({
            where:{
                id:id
            }
        }).then(response=>{
            res.json({
                role:response
            })
        }).catch(err=>{
            res.json({
                err:err
            })
        })
    }
    async editRole(req,res){
        const Role = await role();
        const {id} = req.params
        const {name,user_id} = req.body;
        Role.update({
            name:name,
            user_id:user_id,
            createdAt:null,
            updatedAt:null
        },{
            where:{
                id:id
            }
        }).then(res=>{
            return res.json({
                "message":"updated successfully !"
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}
module.exports = new RoleController();