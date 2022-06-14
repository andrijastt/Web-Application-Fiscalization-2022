import express from 'express'
import UserModel from '../models/user'

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
}