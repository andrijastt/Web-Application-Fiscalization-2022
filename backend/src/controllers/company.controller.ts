import express from 'express'
import UserModel from '../models/user'
import ActivityCodesModel from '../models/activityCodes'
import RegisterModel from '../models/register'
import CompanyModel from '../models/company'


export class CompanyController{

    register = (req: express.Request, res: express.Response) => {

        let username = req.body.username
        let email = req.body.email

        CompanyModel.findOne({"username": username}, (err, registerCompany)=>{
            if(err) console.log(err)
            else {
                if(registerCompany){
                    res.json({'message': 'Username is taken'})
                }
                else{
                    CompanyModel.findOne({"email": email}, (err, registerCompany1)=>{
                        if(err) console.log(err)
                        else {
                            if(registerCompany1){
                                res.json({'message': 'Email is taken'})
                            }
                            else {
                                CompanyModel.collection.insertOne(req.body, (err, resp)=>{
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

        CompanyModel.findOne({"username": username}, (err, registerCompany) =>{
            if(err) console.log(err)
            else res.json(registerCompany)
        })
    }

    getAllRegisterCompany = (req: express.Request, res: express.Response) =>{
        CompanyModel.find({}, (err, registerCompanys)=>{
            if(err) console.log(err)
            else res.json(registerCompanys)
        })
    } 

    accept = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        CompanyModel.updateOne({"username": username}, {$set: {"status": 'accepted'}}, (err, resp)=>{
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

        CompanyModel.collection.deleteOne({"username": username}, (err, resp)=>{
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

    insertData = (req: express.Request, res: express.Response) => {

        let category = req.body.category
        let activityCodes = req.body.activityCodes
        let PDV = req.body.PDV
        let bankAccounts = req.body.bankAccounts
        let storageUnits = req.body.storageUnits
        let registers = req.body.registers
        let username = req.body.username

        CompanyModel.updateOne({"username": username}, {$set: {"category": category, "activityCodes": activityCodes, "PDV": PDV, 
        "bankAccounts": bankAccounts, "storageUnits": storageUnits, "registers": registers, "firstTime": false}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({'message': 'Successfully added data'})
            })
    }

    insertCompany = (req: express.Request, res: express.Response) => {

        CompanyModel.collection.insertOne(req.body, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Company succesfully added'})
        })
    }

    activate = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        CompanyModel.updateOne({'username': username}, {$set: {'active': true}}, (err, resp) =>{
            if(err) console.log(err)
            else res.json({'message': 'Company account activated'})
        })
    }

    deactivate = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        CompanyModel.updateOne({'username': username}, {$set: {'active': false}}, (err, resp) =>{
            if(err) console.log(err)
            else res.json({'message': 'Company account deactivated'})
        })
    }
}