const { send } = require('express/lib/response');
const permission = require('../models/Permission');
const moment = require('moment');
const Joi = require('joi');
let date = new Date();
const isoDate = moment(date).toISOString();
class PermissonController{
    async index(req, res) {
        try {
          const Permission = await permission();
          const response = await Permission.findAll();
          res.json({ data: response });
        } catch (err) {
          res.json({ err: err });
        }
      }      
    async addPer(req,res){
        const Permission = await permission();
        const { name } = req.body
        const data = Permission.build({
            name:name,
            createdAt:null,
            updatedAt:null,
        })
        data.save().then(response=>{
           res.json({
              success:true,
              message:'Permission save successfully'
           })
        }).catch(err=>{
            res.json({
                err:err
            })
        })
    }
    async deletePer(req,res){
        const Permission = await permission();
        const { id } = req.params;
        Permission.destroy({
            where:{
                id:id
            }
        }).then(response=>{
            res.json({
                success:true,
                message:"you have deleted successfully"
            })
        }).catch(err=>{
            res.json({
                err:err
            })
        })
    }
    async getperById(req,res){
        res.send("hello")
    }
}
module.exports = new PermissonController();