"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const registerCompany_1 = __importDefault(require("../models/registerCompany"));
const user_1 = __importDefault(require("../models/user"));
class CompanyController {
    constructor() {
        this.register = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            registerCompany_1.default.findOne({ "username": username }, (err, registerCompany) => {
                if (err)
                    console.log(err);
                else {
                    if (registerCompany) {
                        res.json({ 'message': 'Username is taken' });
                    }
                    else {
                        registerCompany_1.default.findOne({ "email": email }, (err, registerCompany1) => {
                            if (err)
                                console.log(err);
                            else {
                                if (registerCompany1) {
                                    res.json({ 'message': 'Email is taken' });
                                }
                                else {
                                    registerCompany_1.default.collection.insertOne(req.body, (err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ 'message': 'Registration succesfully added' });
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.checkFirstTime = (req, res) => {
            let username = req.body.username;
            registerCompany_1.default.findOne({ "username": username }, (err, registerCompany) => {
                if (err)
                    console.log(err);
                else
                    res.json(registerCompany);
            });
        };
        this.getAllRegisterCompany = (req, res) => {
            registerCompany_1.default.find({}, (err, registerCompanys) => {
                if (err)
                    console.log(err);
                else
                    res.json(registerCompanys);
            });
        };
        this.accept = (req, res) => {
            let username = req.body.username;
            registerCompany_1.default.updateOne({ "username": username }, { $set: { "status": 'accepted' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let password = req.body.password;
                    let user = new user_1.default(req.body);
                    console.log(user);
                    user_1.default.collection.insertOne(user, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'Registration accepted and user is added' });
                    });
                }
            });
        };
        this.decline = (req, res) => {
            let username = req.body.username;
            registerCompany_1.default.collection.deleteOne({ "username": username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Registration declined' });
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map