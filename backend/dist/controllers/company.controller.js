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
const subCategory_1 = __importDefault(require("../models/subCategory"));
const store_1 = __importDefault(require("../models/store"));
const workingRegister_1 = __importDefault(require("../models/workingRegister"));
const dailyReview_1 = __importDefault(require("../models/dailyReview"));
const receipt_1 = __importDefault(require("../models/receipt"));
const table_1 = __importDefault(require("../models/table"));
class CompanyController {
    constructor() {
        this.register = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let PIB = req.body.PIB;
            let JMBP = req.body.JMBP;
            console.log(JMBP);
            user_1.default.findOne({ "username": username }, (err, registerCompany) => {
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
                                    company_1.default.findOne({ "PIB": PIB }, (err, registerCompany2) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (registerCompany2) {
                                                res.json({ 'message': 'PIB is taken' });
                                            }
                                            else {
                                                company_1.default.findOne({ "JMBP": JMBP }, (err, registerCompany3) => {
                                                    if (err)
                                                        console.log(err);
                                                    else {
                                                        if (registerCompany3) {
                                                            res.json({ 'message': 'JMBP is taken' });
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
                    if (item.image == null) {
                        company_1.default.findOne({ 'PIB': item.companyPIB }, (err, image) => {
                            if (err)
                                console.log(err);
                            else {
                                item.image = image[0];
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
                        }).distinct('imageData');
                    }
                    else {
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
                }
            });
        };
        this.createCategory = (req, res) => {
            let PIB = req.body.PIB;
            let name = req.body.name;
            category_1.default.find({ 'companyPIB': PIB, 'name': name }, (err, category) => {
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
        this.createSubCategory = (req, res) => {
            let PIB = req.body.PIB;
            let name = req.body.name;
            let subcategory = req.body.subcategory;
            subCategory_1.default.find({ 'companyPIB': PIB, 'name': subcategory, 'category': name }, (err, subcategory) => {
                if (err)
                    console.log(err);
                else {
                    if (!subcategory) {
                        res.json({ 'message': 'Subcategory already exists' });
                    }
                    else {
                        subCategory_1.default.collection.insertOne(req.body, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'Subcategory added' });
                        });
                    }
                }
            });
        };
        this.getMyCategories = (req, res) => {
            let PIB = req.body.PIB;
            category_1.default.find({ "companyPIB": PIB }, (err, category) => {
                if (err)
                    console.log(err);
                else
                    res.json(category);
            });
        };
        this.getMySubCategories = (req, res) => {
            let PIB = req.body.PIB;
            subCategory_1.default.find({ "companyPIB": PIB }, (err, category) => {
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
        this.setItemSubCategory = (req, res) => {
            let itemName = req.body.itemName;
            let PIB = req.body.PIB;
            let producer = req.body.producer;
            let subcategory = req.body.subcategory;
            item_1.default.findOne({ "itemName": itemName, 'companyPIB': PIB, 'producer': producer }, (err, items) => {
                if (err)
                    console.log(err);
                else {
                    if (!items.subcategory && items.category == subcategory.name) {
                        item_1.default.updateOne({ "itemName": itemName, 'companyPIB': PIB, 'producer': producer }, { $set: { 'subcategory': subcategory.subcategory } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'Subategory set!' });
                        });
                    }
                    else {
                        res.json({ 'message': "Already has subcategory or subactegory isn't a part of category" });
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
        this.giveReceipt = (req, res) => {
            let dateReview = new Date(req.body.dateReview);
            let companyPIB = req.body.companyPIB;
            let companyName = req.body.companyName;
            dailyReview_1.default.findOne({ 'date': dateReview, 'companyPIB': companyPIB, 'companyName': companyName }, (err, DR) => {
                if (err)
                    console.log(err);
                else {
                    if (DR) {
                        let itemStats = req.body.selectedItems;
                        for (let i = 0; i < itemStats.length; i++) {
                            itemStats_1.default.updateOne({ 'place': itemStats[i].place, 'itemName': itemStats[i].itemName, 'companyName': itemStats[i].companyName,
                                'itemProducer': itemStats[i].itemProducer }, { $inc: { currentState: -itemStats[i].currentState } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    console.log("ok");
                            });
                        }
                        let receipt = new receipt_1.default();
                        receipt.companyName = req.body.companyName;
                        receipt.companyPIB = req.body.companyPIB;
                        receipt.selectedItems = req.body.selectedItems;
                        receipt.paymentType = req.body.paymentType;
                        receipt.amountToPay = req.body.amountToPay;
                        receipt.tax = req.body.tax;
                        receipt.change = req.body.change;
                        receipt.idCard = req.body.idCard;
                        receipt.firstNameBuyer = req.body.firstNameBuyer;
                        receipt.lastNameBuyer = req.body.lastNameBuyer;
                        receipt.creditCardSlip = req.body.creditCardSlip;
                        receipt.virmanCustor = req.body.virmanCustomer;
                        receipt.date = req.body.date;
                        receipt_1.default.collection.insertOne(receipt, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                dailyReview_1.default.updateOne({ 'date': dateReview, 'companyPIB': companyPIB }, { $inc: { tax: receipt.tax,
                                        moneyEarned: receipt.amountToPay } }, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json({ 'message': 'Receipt successfully added' });
                                });
                            }
                        });
                    }
                    else {
                        let DRtemp = new dailyReview_1.default();
                        DRtemp.companyPIB = req.body.companyPIB;
                        DRtemp.companyName = req.body.companyName;
                        DRtemp.tax = req.body.tax;
                        DRtemp.moneyEarned = req.body.amountToPay;
                        DRtemp.date = dateReview;
                        dailyReview_1.default.collection.insertOne(DRtemp, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                let itemStats = req.body.selectedItems;
                                for (let i = 0; i < itemStats.length; i++) {
                                    itemStats_1.default.updateOne({ 'place': itemStats[i].place, 'itemName': itemStats[i].itemName,
                                        'itemProducer': itemStats[i].itemProducer }, { $inc: { currentState: -itemStats[i].currentState } }, (err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            console.log("ok");
                                    });
                                }
                                let receipt = new receipt_1.default();
                                receipt.companyName = req.body.companyName;
                                receipt.companyPIB = req.body.companyPIB;
                                receipt.selectedItems = req.body.selectedItems;
                                receipt.paymentType = req.body.paymentType;
                                receipt.amountToPay = req.body.amountToPay;
                                receipt.tax = req.body.tax;
                                receipt.change = req.body.change;
                                receipt.idCard = req.body.idCard;
                                receipt.firstNameBuyer = req.body.firstNameBuyer;
                                receipt.lastNameBuyer = req.body.lastNameBuyer;
                                receipt.creditCardSlip = req.body.creditCardSlip;
                                receipt.virmanCustor = req.body.virmanCustomer;
                                receipt.date = req.body.date;
                                receipt_1.default.collection.insertOne(receipt, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json({ 'message': 'Receipt successfully added' });
                                });
                            }
                        });
                    }
                }
            });
        };
        this.getMyDailyReviews = (req, res) => {
            let companyPIB = req.body.companyPIB;
            dailyReview_1.default.find({ 'companyPIB': companyPIB }, (err, dailyReviews) => {
                if (err)
                    console.log(err);
                else
                    res.json(dailyReviews);
            }).distinct('date');
        };
        this.getDailyReview = (req, res) => {
            let companyPIB = req.body.companyPIB;
            let date = req.body.date;
            dailyReview_1.default.findOne({ 'companyPIB': companyPIB, 'date': date }, (err, dailyReviews) => {
                if (err)
                    console.log(err);
                else
                    res.json(dailyReviews);
            });
        };
        this.getDepartmentsByPlace = (req, res) => {
            let companyPIB = req.body.companyPIB;
            let storeName = req.body.storeName;
            table_1.default.find({ 'companyPIB': companyPIB, 'storeName': storeName }, (err, tables) => {
                if (err)
                    console.log(err);
                else
                    res.json(tables);
            }).distinct('department');
        };
        this.getMyTables = (req, res) => {
            let companyPIB = req.body.companyPIB;
            let storeName = req.body.storeName;
            let department = req.body.department;
            table_1.default.find({ 'companyPIB': companyPIB, 'storeName': storeName, 'department': department }, (err, tables) => {
                if (err)
                    console.log(err);
                else
                    res.json(tables);
            });
        };
        this.setTableToTaken = (req, res) => {
            let id = req.body.id;
            let companyPIB = req.body.companyPIB;
            let storeName = req.body.storeName;
            table_1.default.updateOne({ 'companyPIB': companyPIB, 'storeName': storeName, 'id': id }, { $set: { taken: true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json('Taken');
            });
        };
        this.setTableToFree = (req, res) => {
            let id = req.body.id;
            let companyPIB = req.body.companyPIB;
            let storeName = req.body.storeName;
            table_1.default.updateOne({ 'companyPIB': companyPIB, 'storeName': storeName, 'id': id }, { $set: { taken: false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json('Free');
            });
        };
        this.getDistinctTables = (req, res) => {
            let companyPIB = req.body.companyPIB;
            table_1.default.find({ 'companyPIB': companyPIB }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            }).distinct('id');
        };
        this.updateCurrentState = (req, res) => {
            let itemStat = req.body.itemStat;
            itemStats_1.default.updateOne({ 'itemName': itemStat.itemName, 'itemProducer': itemStat.itemProducer, 'companyName': itemStat.companyName,
                'place': itemStat.place }, { $inc: { currentState: -itemStat.currentState } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json('ok');
                    console.log("Storage updated");
                }
            });
        };
        this.updateTable = (req, res) => {
            let items1 = req.body.items;
            let table = req.body.table;
            table_1.default.updateOne({ 'id': table.id, 'companyPIB': table.companyPIB, 'storeName': table.storeName }, { $set: { items: items1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json('ok');
                    console.log("Table updated");
                }
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map