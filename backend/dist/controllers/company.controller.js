"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const user_1 = __importDefault(require("../models/user"));
const activityCodes_1 = __importDefault(require("../models/activityCodes"));
const register_1 = __importDefault(require("../models/register"));
const company_1 = __importDefault(require("../models/company"));
class CompanyController {
    constructor() {
        this.register = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            company_1.default.findOne({ "username": username }, (err, registerCompany) => {
                if (err)
                    console.log(err);
                else {
                    if (registerCompany) {
                        res.json({ 'message': 'Username is taken' });
                    }
                    else {
                        company_1.default.findOne({ "email": email }, (err, registerCompany1) => {
                            if (err)
                                console.log(err);
                            else {
                                if (registerCompany1) {
                                    res.json({ 'message': 'Email is taken' });
                                }
                                else {
                                    company_1.default.collection.insertOne(req.body, (err, resp) => {
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
            company_1.default.findOne({ "username": username }, (err, registerCompany) => {
                if (err)
                    console.log(err);
                else
                    res.json(registerCompany);
            });
        };
        this.getAllRegisterCompany = (req, res) => {
            company_1.default.find({}, (err, registerCompanys) => {
                if (err)
                    console.log(err);
                else
                    res.json(registerCompanys);
            });
        };
        this.accept = (req, res) => {
            let username = req.body.username;
            company_1.default.updateOne({ "username": username }, { $set: { "status": 'accepted' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let user = new user_1.default(req.body);
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
            company_1.default.collection.deleteOne({ "username": username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Registration declined' });
            });
        };
        this.getAllActivityCodes = (req, res) => {
            activityCodes_1.default.find({}, (err, activityCodes) => {
                if (err)
                    console.log(err);
                else
                    res.json(activityCodes);
            });
        };
        this.getStoreCodes = (req, res) => {
            activityCodes_1.default.find({ "code": { $lt: 5000 } }, (err, activityCodes) => {
                if (err)
                    console.log(err);
                else
                    res.json(activityCodes);
            });
        };
        this.getCatererCodes = (req, res) => {
            activityCodes_1.default.find({ "code": { $gt: 5000 } }, (err, activityCodes) => {
                if (err)
                    console.log(err);
                else
                    res.json(activityCodes);
            });
        };
        this.getRegisterModels = (req, res) => {
            register_1.default.find({}, (err, registers) => {
                if (err)
                    console.log(err);
                else
                    res.json(registers);
            });
        };
        this.insertData = (req, res) => {
            let category = req.body.category;
            let activityCodes = req.body.activityCodes;
            let PDV = req.body.PDV;
            let bankAccounts = req.body.bankAccounts;
            let storageUnits = req.body.storageUnits;
            let registers = req.body.registers;
            let username = req.body.username;
            company_1.default.updateOne({ "username": username }, { $set: { "category": category, "activityCodes": activityCodes, "PDV": PDV,
                    "bankAccounts": bankAccounts, "storageUnits": storageUnits, "registers": registers, "firstTime": false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Successfully added data' });
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map