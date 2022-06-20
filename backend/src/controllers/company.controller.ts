import express from 'express'
import RegisterCompanyModel from '../models/registerCompany'

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
}