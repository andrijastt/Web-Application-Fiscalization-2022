import express from 'express'
import UserModel from '../models/user'
import CompanyModel from '../models/company'
import ItemStatsModel from '../models/itemStats'
import BuyerModel from '../models/buyer'

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

    getMyBuyer = (req: express.Request, res: express.Response)=>{
        let username = req.body.username

        BuyerModel.findOne({'username': username}, (err, buyer) => {
            if(err) console.log(err)
            else res.json(buyer)
        })
    }

    getCheapestPrice = (req: express.Request, res: express.Response)=>{
        let itemName = req.body.itemName
        let producer = req.body.producer
        let companyName = req.body.companyName
        ItemStatsModel.find({'itemName': {$regex: itemName}, 'itemProducer': {$regex: producer}, 'currentState': {$ne: 0}, 
        'companyName': companyName}, (err, items)=>{
            if(err) console.log(err);
            else{
                res.json(items)     
            } 
        }).sort({sellingPrice: 1}).limit(1)
    }

    getDistinctStorageUnits = (req: express.Request, res: express.Response)=>{
        let itemName = req.body.itemName
        let producer = req.body.producer
        let companyName = req.body.companyName
        ItemStatsModel.find({'itemName': {$regex: itemName}, 'itemProducer': {$regex: producer}, 'currentState': {$gt: 0}, 
        'companyName': companyName}, (err, items)=>{
            if(err) console.log(err);
            else res.json(items)
        }).distinct("storageUnit")
    }

    searchItem = (req: express.Request, res: express.Response)=>{
        let itemName = req.body.itemName
        let producer = req.body.producer

        ItemStatsModel.find({'itemName': {$regex: itemName}, 'itemProducer': {$regex: producer}, 'currentState': {$gt: 0}}, (err, items)=>{
            if(err) console.log(err);
            else res.json(items)
        }).sort({sellingPrice: 1})
    }

    getMyItems = (req: express.Request, res: express.Response)=>{
        let companyName = req.body.companyName

        ItemStatsModel.find({'companyName': companyName, 'currentState': {$gt: 0}}, (err, items)=>{
            if(err) console.log(err);
            else res.json(items)
        }).distinct("itemName")
    }
}