import express from 'express'
import RegisterCompanyModel from '../models/registerCompany'
import UserModel from '../models/user'

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
                let password = req.body.password
                let user = new UserModel(req.body)
                
                console.log(user)

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
}