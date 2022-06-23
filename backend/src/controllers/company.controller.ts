import express from 'express'
import RegisterCompanyModel from '../models/registerCompany'
import UserModel from '../models/user'
import ActivityCodesModel from '../models/activityCodes'
import RegisterModel from '../models/register'

export class CompanyController{

    register = (req: express.Request, res: express.Response) => {

        let username = req.body.username
        let email = req.body.email

        RegisterCompanyModel.findOne({"username": username}, (err, registerCompany)=>{
            if(err) console.log(err)
            else {
                if(registerCompany){
                    res.json({'message': 'Username is taken'})
                }
                else{
                    RegisterCompanyModel.findOne({"email": email}, (err, registerCompany1)=>{
                        if(err) console.log(err)
                        else {
                            if(registerCompany1){
                                res.json({'message': 'Email is taken'})
                            }
                            else {
                                RegisterCompanyModel.collection.insertOne(req.body, (err, resp)=>{
                                    if(err) console.log(err)
                                    else res.json({'message': 'Registration succesfully added'})
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    checkFirstTime = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        RegisterCompanyModel.findOne({"username": username}, (err, registerCompany) =>{
            if(err) console.log(err)
            else res.json(registerCompany)
        })
    }

    getAllRegisterCompany = (req: express.Request, res: express.Response) =>{
        RegisterCompanyModel.find({}, (err, registerCompanys)=>{
            if(err) console.log(err)
            else res.json(registerCompanys)
        })
    } 

    accept = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        RegisterCompanyModel.updateOne({"username": username}, {$set: {"status": 'accepted'}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                let user = new UserModel(req.body)

                UserModel.collection.insertOne(user, (err, resp) => {
                    if(err) console.log(err)
                    else res.json({'message': 'Registration accepted and user is added'})
                })
            }
        })
    }

    decline = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        RegisterCompanyModel.collection.deleteOne({"username": username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Registration declined'})
        })
    }

    getAllActivityCodes = (req: express.Request, res: express.Response) => {
        ActivityCodesModel.find({}, (err, activityCodes)=>{
            if(err) console.log(err)
            else res.json(activityCodes)
        })
    }

    getStoreCodes = (req: express.Request, res: express.Response) => {
        ActivityCodesModel.find({"code": {$lt: 5000}}, (err, activityCodes)=>{
            if(err) console.log(err)
            else res.json(activityCodes)
        })
    }

    getCatererCodes = (req: express.Request, res: express.Response) => {
        ActivityCodesModel.find({"code": {$gt: 5000}}, (err, activityCodes)=>{
            if(err) console.log(err)
            else res.json(activityCodes)
        })
    }

    getRegisterModels = (req: express.Request, res: express.Response) => {
        RegisterModel.find({}, (err, registers)=>{
            if(err) console.log(err)
            else res.json(registers)
        })
    }
}