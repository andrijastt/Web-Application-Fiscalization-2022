import express from 'express'
import UserModel from '../models/user'
import ActivityCodesModel from '../models/activityCodes'
import RegisterModel from '../models/register'
import CompanyModel from '../models/company'
import StorageUnitModel from '../models/storageUnit'

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
                else {
                    let num
                    StorageUnitModel.find({}, (err, data)=>{
                        if(err) console.log(err)
                        else {
                            num = data.length
                            for(let i = 0; i < req.body.storageUnits; i++){
                                let storageUnit = new StorageUnitModel()
                                storageUnit.name = "Magacin " + (num + i + 1)
                                storageUnit.id = num + i + 1
                                storageUnit.companyPIB = req.body.PIB
                    
                                StorageUnitModel.collection.insertOne(storageUnit, (err, resp)=>{
                                    if(err) console.log(err)
                                })
                            }
                            res.json({'message': 'Company succesfully added'})
                        }
                    })
                    res.json({'message': 'Successfully added data'})
                }
            })
    }

    insertCompany = (req: express.Request, res: express.Response) => {
        
        CompanyModel.collection.insertOne(req.body, (err, resp)=>{
            if(err) console.log(err)
            else {
                let user = new UserModel()
                user.username = req.body.username
                user.password = req.body.password
                user.type = 1

                UserModel.collection.insertOne(user, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        let num
                        StorageUnitModel.find({}, (err, data)=>{
                            if(err) console.log(err)
                            else {                 
                                num = data.length
                                for(let i = 0; i < req.body.storageUnits; i++){
                                    let storageUnit = new StorageUnitModel()
                                    storageUnit.name = "Magacin " + (num + i + 1)
                                    storageUnit.id = num + i + 1
                                    storageUnit.companyPIB = req.body.PIB
                        
                                    StorageUnitModel.collection.insertOne(storageUnit, (err, resp)=>{
                                        if(err) console.log(err)
                                    })
                                }
                                res.json({'message': 'Company succesfully added'})
                            }
                        })
                    }     
                })           
            }
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

    getMyStorageUntis = (req: express.Request, res: express.Response) => {
        let CompanyPIB = req.body.PIB
        
        StorageUnitModel.find({"companyPIB": CompanyPIB}, (err, storageUnits)=>{
            if(err) console.log(err)
            else res.json(storageUnits)
        })
    }

    findCompanyByPIB = (req: express.Request, res: express.Response) => {
        let CompanyPIB = req.body.PIB    
        CompanyModel.findOne({"PIB": CompanyPIB}, (err, company)=>{
            if(err) console.log(err)
            else res.json(company)         
        })
    }
}