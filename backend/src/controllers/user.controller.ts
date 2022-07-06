import express from 'express'
import UserModel from '../models/user'
import CompanyModel from '../models/company'
import ItemModel from '../models/item'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({'username':username, 'password': password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({'username':username}, (err, user)=>{
            if(err) console.log(err);
            if(user.type == 1){
                CompanyModel.updateOne({'username': username}, {$set: {'password': password}}, (err, resp)=>{
                    if(err) console.log(err)
                })
            }
            UserModel.updateOne({'username': username}, {$set: {'password': password}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({'message': 'Password changed!'})
            })
        })
    }

    searchItem = (req: express.Request, res: express.Response)=>{
        let itemName = req.body.itemName
        let producer = req.body.producer

        ItemModel.find({'itemName': {$regex: itemName}, 'producer': {$regex: producer}}, (err, items)=>{
            if(err) console.log(err);
            else res.json(items)
        })
    }
}