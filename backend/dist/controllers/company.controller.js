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
const storageUnit_1 = __importDefault(require("../models/storageUnit"));
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
            let PIB = req.body.PIB;
            company_1.default.updateOne({ "username": username }, { $set: { "category": category, "activityCodes": activityCodes, "PDV": PDV,
                    "bankAccounts": bankAccounts, "storageUnits": storageUnits, "registers": registers, "firstTime": false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    storageUnit_1.default.find({}, (err, data) => {
                        if (err)
                            console.log(err);
                        else {
                            let num;
                            num = data.length;
                            for (let i = 0; i < req.body.storageUnits; i++) {
                                let storageUnit = new storageUnit_1.default();
                                storageUnit.name = "Magacin " + (num + i + 1);
                                storageUnit.id = num + i + 1;
                                storageUnit.companyPIB = PIB;
                                storageUnit_1.default.collection.insertOne(storageUnit, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                });
                            }
                        }
                    });
                    res.json({ 'message': 'Successfully added data' });
                }
            });
        };
        this.insertCompany = (req, res) => {
            company_1.default.collection.insertOne(req.body, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let user = new user_1.default();
                    user.username = req.body.username;
                    user.password = req.body.password;
                    user.type = 1;
                    user_1.default.collection.insertOne(user, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            let num;
                            storageUnit_1.default.find({}, (err, data) => {
                                if (err)
                                    console.log(err);
                                else {
                                    num = data.length;
                                    for (let i = 0; i < req.body.storageUnits; i++) {
                                        let storageUnit = new storageUnit_1.default();
                                        storageUnit.name = "Magacin " + (num + i + 1);
                                        storageUnit.id = num + i + 1;
                                        storageUnit.companyPIB = req.body.PIB;
                                        storageUnit_1.default.collection.insertOne(storageUnit, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                        });
                                    }
                                    res.json({ 'message': 'Company succesfully added' });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.activate = (req, res) => {
            let username = req.body.username;
            company_1.default.updateOne({ 'username': username }, { $set: { 'active': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Company account activated' });
            });
        };
        this.deactivate = (req, res) => {
            let username = req.body.username;
            company_1.default.updateOne({ 'username': username }, { $set: { 'active': false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Company account deactivated' });
            });
        };
        this.getMyStorageUntis = (req, res) => {
            let CompanyPIB = req.body.PIB;
            storageUnit_1.default.find({ "companyPIB": CompanyPIB }, (err, storageUnits) => {
                if (err)
                    console.log(err);
                else
                    res.json(storageUnits);
            });
        };
        this.findCompanyByPIB = (req, res) => {
            let CompanyPIB = req.body.PIB;
            company_1.default.findOne({ "PIB": CompanyPIB }, (err, company) => {
                if (err)
                    console.log(err);
                else
                    res.json(company);
            });
        };
        this.getCompany = (req, res) => {
            let username = req.body.username;
            company_1.default.findOne({ "username": username }, (err, company) => {
                if (err)
                    console.log(err);
                else
                    res.json(company);
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map