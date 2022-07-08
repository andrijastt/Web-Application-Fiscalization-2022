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
const customer_1 = __importDefault(require("../models/customer"));
const item_1 = __importDefault(require("../models/item"));
const itemStats_1 = __importDefault(require("../models/itemStats"));
const category_1 = __importDefault(require("../models/category"));
const store_1 = __importDefault(require("../models/store"));
const workingRegister_1 = __importDefault(require("../models/workingRegister"));
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
                                        else {
                                            res.json({ 'message': 'Registration succesfully added' });
                                        }
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
            let stores = req.body.objects;
            let storageUnits = req.body.storageUnits;
            let registers = req.body.registers;
            let username = req.body.username;
            company_1.default.updateOne({ "username": username }, { $set: { "category": category, "activityCodes": activityCodes, "PDV": PDV,
                    "bankAccounts": bankAccounts, "storageUnits": storageUnits.length, "registers": registers, "firstTime": false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    storageUnit_1.default.collection.insertMany(storageUnits, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            store_1.default.collection.insertMany(stores, (err, resp1) => {
                                if (err)
                                    console.log(err);
                                else {
                                    for (let i = 0; i < registers.length; i++) {
                                        workingRegister_1.default.collection.insertMany(registers[i], (err, resp2) => {
                                            if (err)
                                                console.log(err);
                                        });
                                    }
                                    res.json({ 'message': 'Successfully added data' });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.insertCompany = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let username = req.body.username;
            let password = req.body.password;
            let telephoneNumber = req.body.telephoneNumber;
            let email = req.body.email;
            let name = req.body.name;
            let country = req.body.country;
            let city = req.body.city;
            let postNumber = req.body.postNumber;
            let streetName = req.body.streetName;
            let streetNumber = req.body.streetNumber;
            let PIB = req.body.PIB;
            let JMBP = req.body.JMBP;
            let imageData = req.body.imageData;
            let status = req.body.status;
            let firstTime = req.body.firstTime;
            let active = req.body.active;
            let category = req.body.category;
            let activityCodes = req.body.activityCodes;
            let PDV = req.body.PDV;
            let bankAccounts = req.body.bankAccounts;
            let storageUnits = req.body.storageUnits;
            let stores = req.body.stores;
            let registers = req.body.registers;
            let company = new company_1.default();
            company.firstname = firstname;
            company.lastname = lastname;
            company.username = username;
            company.password = password;
            company.telephoneNumber = telephoneNumber;
            company.email = email;
            company.name = name;
            company.country = country;
            company.city = city;
            company.postNumber = postNumber;
            company.streetName = streetName;
            company.streetNumber = streetNumber;
            company.PIB = PIB;
            company.JMBP = JMBP;
            company.imageData = imageData;
            company.status = status;
            company.active = active;
            company.firstTime = firstTime;
            company.category = category;
            company.activityCodes = activityCodes;
            company.PDV = PDV;
            company.bankAccounts = bankAccounts;
            company.storageUnits = storageUnits.length;
            company.registers = registers;
            company_1.default.collection.insertOne(company, (err, resp) => {
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
                            storageUnit_1.default.collection.insertMany(storageUnits, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else {
                                    store_1.default.collection.insertMany(stores, (err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            for (let i = 0; i < registers.length; i++) {
                                                workingRegister_1.default.collection.insertMany(registers[i], (err, resp2) => {
                                                    if (err)
                                                        console.log(err);
                                                });
                                            }
                                            res.json({ 'message': 'Successfully added data' });
                                        }
                                    });
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
        this.addCustomer = (req, res) => {
            customer_1.default.findOne({ "email": req.body.email }, (err, customer) => {
                if (err)
                    console.log(err);
                if (customer) {
                    res.json({ 'message': 'Customer is already added' });
                }
                else {
                    customer_1.default.collection.insertOne(req.body, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'Customer added' });
                    });
                }
            });
        };
        this.getMyCustomers = (req, res) => {
            let PIB = req.body.PIB;
            customer_1.default.find({ "sellerPIB": PIB }, (err, customers) => {
                if (err)
                    console.log(err);
                else
                    res.json(customers);
            });
        };
        this.getMyItems = (req, res) => {
            let PIB = req.body.PIB;
            item_1.default.find({ "companyPIB": PIB }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            });
        };
        this.addItem = (req, res) => {
            let PIB = req.body.companyPIB;
            item_1.default.findOne({ "itemId": req.body.itemId, "companyPIB": PIB }, (err, item) => {
                if (err)
                    console.log(err);
                if (item) {
                    res.json({ 'message': 'Item ID taken' });
                }
                else {
                    let item = new item_1.default();
                    item.companyPIB = req.body.companyPIB;
                    item.itemId = req.body.itemId;
                    item.itemName = req.body.itemName;
                    item.unitOfMeasure = req.body.unitOfMeasure;
                    item.taxRate = req.body.taxRate;
                    item.type = req.body.type;
                    item.image = req.body.image;
                    item.countryOfOrigin = req.body.countryOfOrigin;
                    item.foreignItemName = req.body.foreignItemName;
                    item.barcodeNumber = req.body.barcodeNumber;
                    item.producer = req.body.producer;
                    item.customsRate = req.body.customsRate;
                    item.ekoTax = req.body.ekoTax;
                    item.excise = req.body.excise;
                    item.minItems = req.body.minItems;
                    item.maxItems = req.body.maxItems;
                    item.description = req.body.description;
                    item.declaration = req.body.declaration;
                    item_1.default.collection.insertOne(item, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            let itemStats = req.body.itemStats;
                            let itemStatsStore = req.body.itemStatsStore;
                            itemStats_1.default.collection.insertMany(itemStats, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else {
                                    itemStats_1.default.collection.insertMany(itemStatsStore, (err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ 'message': 'Item added' });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.createCategory = (req, res) => {
            let PIB = req.body.PIB;
            let name = req.body.name;
            category_1.default.find({ 'PIB': PIB, 'name': name }, (err, category) => {
                if (err)
                    console.log(err);
                else {
                    if (!category) {
                        res.json({ 'message': 'Category already exists' });
                    }
                    else {
                        category_1.default.collection.insertOne(req.body, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'Category added' });
                        });
                    }
                }
            });
        };
        this.getMyCategories = (req, res) => {
            let PIB = req.body.PIB;
            category_1.default.find({ "PIB": PIB }, (err, category) => {
                if (err)
                    console.log(err);
                else
                    res.json(category);
            });
        };
        this.getMyRegisters = (req, res) => {
            let PIB = req.body.PIB;
            workingRegister_1.default.find({ "companyPIB": PIB }, (err, category) => {
                if (err)
                    console.log(err);
                else
                    res.json(category);
            });
        };
        this.getMyStores = (req, res) => {
            let PIB = req.body.PIB;
            store_1.default.find({ "companyPIB": PIB }, (err, stores) => {
                if (err)
                    console.log(err);
                else
                    res.json(stores);
            });
        };
        this.searchItem = (req, res) => {
            let itemName = req.body.itemName;
            let PIB = req.body.PIB;
            item_1.default.find({ "itemName": { $regex: itemName }, 'companyPIB': PIB }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            });
        };
        this.setItemCategory = (req, res) => {
            let itemName = req.body.itemName;
            let PIB = req.body.PIB;
            let producer = req.body.producer;
            let category = req.body.category;
            item_1.default.findOne({ "itemName": itemName, 'companyPIB': PIB, 'producer': producer }, (err, items) => {
                if (err)
                    console.log(err);
                else {
                    if (!items.category) {
                        item_1.default.updateOne({ "itemName": itemName, 'companyPIB': PIB, 'producer': producer }, { $set: { 'category': category } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'Category set!' });
                        });
                    }
                    else {
                        res.json({ 'message': 'Already has category' });
                    }
                }
            });
        };
        this.getMyPlaces = (req, res) => {
            let companyName = req.body.companyName;
            itemStats_1.default.find({ "companyName": companyName }, (err, itemStats) => {
                if (err)
                    console.log(err);
                else
                    res.json(itemStats);
            }).distinct('place');
        };
        this.getItemStats = (req, res) => {
            let companyName = req.body.companyName;
            let place = req.body.place;
            itemStats_1.default.find({ "companyName": companyName, 'place': place }, (err, itemStats) => {
                if (err)
                    console.log(err);
                else
                    res.json(itemStats);
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map