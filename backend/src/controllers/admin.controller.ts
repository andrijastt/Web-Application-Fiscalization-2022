import express from 'express'
import UserModel from '../models/user'
import BuyerModel from '../models/buyer'
import DailyReviewModel from '../models/dailyReview'

export class AdminController{
    loginAdmin = (req: express.Request, res: express.Response) =>{
        let username = req.body.username
        let password = req.body.password
        let type = 2

        UserModel.findOne({"username": username, "password": password, "type": type}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user);
        })
    }

    insertUser = (req: express.Request, res: express.Response)=> {
        BuyerModel.findOne({'username': req.body.username}, (err, buyer)=>{
            if(err) console.log(err)
            else {
                if(buyer){
                    res.json({'message': 'User already in db'})
                } else {
                    BuyerModel.collection.insertOne(req.body, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            let user = new UserModel()
                            user.username = req.body.username
                            user.password = req.body.password
                            user.type = 0
                            UserModel.collection.insertOne(user, (err, resp) => {
                                if(err) console.log(err)
                                else {
                                    res.json({'message': 'Buyer added'})
                                }
                            })
                        }
                    })
                }
            }
        })
    }

    getAllDailyReviews = (req: express.Request, res: express.Response) => {
        DailyReviewModel.find({}, (err, DR)=>{
            if(err) console.log(err)
            else res.json(DR)
        })
    }

    getSearchDailyReviews = (req: express.Request, res: express.Response) => {

        let companyNameSearch = req.body.companyNameSearch
        let companyPIBSearch = req.body.companyPIBSearch
        let firstDay = new Date(req.body.firstDay)
        let lastDay = new Date(req.body.lastDay)

        if(companyPIBSearch == undefined){
            DailyReviewModel.find({'companyName': {$regex: companyNameSearch}, 'date': {$gte: firstDay, $lte: lastDay}}, (err, DRs)=>{
            if(err) console.log(err)
            else res.json(DRs)
        })
        } else {
            DailyReviewModel.find({'companyName': {$regex: companyNameSearch}, 'companyPIB': companyPIBSearch, 
            'date': {$gte: firstDay, $lte: lastDay}}, (err, DRs)=>{
                if(err) console.log(err)
                else res.json(DRs)
            })
        }
        
    }
}