import express from 'express'
import UserModel from '../models/user'
import ActivityCodesModel from '../models/activityCodes'
import RegisterModel from '../models/register'
import CompanyModel from '../models/company'
import StorageUnitModel from '../models/storageUnit'
import CustomerModel from '../models/customer'
import ItemModel from '../models/item'
import ItemStatsModel from '../models/itemStats'
import CategoryModel from '../models/category'
import StoreModel from '../models/store'
import WorkingRegisterModel from '../models/workingRegister'
import DailyReviewModel from '../models/dailyReview'
import ReceiptModel from '../models/receipt'

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
                                    else{
                                        res.json({'message': 'Registration succesfully added'})
                                    } 
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
        let stores = req.body.objects
        let storageUnits = req.body.storageUnits
        let registers = req.body.registers
        let username = req.body.username

        CompanyModel.updateOne({"username": username}, {$set: {"category": category, "activityCodes": activityCodes, "PDV": PDV, 
        "bankAccounts": bankAccounts, "storageUnits": storageUnits.length, "registers": registers, "firstTime": false}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                StorageUnitModel.collection.insertMany(storageUnits, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        StoreModel.collection.insertMany(stores, (err, resp1)=>{
                            if(err) console.log(err)
                            else {
                                for(let i = 0; i < registers.length; i++){
                                    WorkingRegisterModel.collection.insertMany(registers[i], (err, resp2)=> {
                                        if(err) console.log(err)
                                    })
                                }
                                res.json({'message': 'Successfully added data'})
                            }
                        })
                    }
                })
            }
        })


        
    }

    insertCompany = (req: express.Request, res: express.Response) => {
        
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let username = req.body.username
        let password = req.body.password
        let telephoneNumber = req.body.telephoneNumber
        let email = req.body.email
        let name = req.body.name
        let country = req.body.country
        let city = req.body.city
        let postNumber = req.body.postNumber
        let streetName = req.body.streetName
        let streetNumber = req.body.streetNumber
        let PIB = req.body.PIB
        let JMBP = req.body.JMBP
        let imageData = req.body.imageData
        let status = req.body.status
        let firstTime = req.body.firstTime
        let active = req.body.active
        let category = req.body.category
        let activityCodes = req.body.activityCodes
        let PDV = req.body.PDV
        let bankAccounts = req.body.bankAccounts
        let storageUnits = req.body.storageUnits
        let stores = req.body.stores
        let registers = req.body.registers
        
        let company = new CompanyModel()
        company.firstname = firstname
        company.lastname = lastname
        company.username = username
        company.password = password
        company.telephoneNumber = telephoneNumber
        company.email = email
        company.name = name
        company.country = country
        company.city = city
        company.postNumber = postNumber
        company.streetName = streetName
        company.streetNumber = streetNumber
        company.PIB = PIB
        company.JMBP = JMBP
        company.imageData = imageData
        company.status = status
        company.active = active
        company.firstTime = firstTime
        company.category = category
        company.activityCodes = activityCodes
        company.PDV = PDV
        company.bankAccounts = bankAccounts
        company.storageUnits = storageUnits.length
        company.registers = registers

        CompanyModel.collection.insertOne(company, (err, resp) => {
            if(err) console.log(err)
            else {
                let user = new UserModel()
                user.username = req.body.username
                user.password = req.body.password
                user.type = 1
                UserModel.collection.insertOne(user, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        StorageUnitModel.collection.insertMany(storageUnits, (err, resp)=>{
                            if(err) console.log(err)
                            else {
                                StoreModel.collection.insertMany(stores, (err, resp) => {
                                    if(err) console.log(err)
                                    else{
                                        for(let i = 0; i < registers.length; i++){
                                            WorkingRegisterModel.collection.insertMany(registers[i], (err, resp2)=> {
                                                if(err) console.log(err)
                                            })
                                        }
                                        res.json({'message': 'Successfully added data'})
                                    }
                                })
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

    getCompany = (req: express.Request, res: express.Response) => {
        let username = req.body.username    
        CompanyModel.findOne({"username": username}, (err, company)=>{
            if(err) console.log(err)
            else res.json(company)         
        })
    }

    addCustomer = (req: express.Request, res: express.Response) => {

        CustomerModel.findOne({"email": req.body.email}, (err, customer)=>{
            if(err) console.log(err)
            if(customer){
                res.json({'message': 'Customer is already added'})
            } else {
                CustomerModel.collection.insertOne(req.body, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'Customer added'})
                })
            }
        })
    }

    getMyCustomers = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        CustomerModel.find({"sellerPIB": PIB}, (err, customers)=>{
            if(err) console.log(err)
            else res.json(customers)
        })
    }

    getMyItems = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        ItemModel.find({"companyPIB": PIB}, (err, items)=>{
            if(err) console.log(err)
            else res.json(items)
        })
    }

    addItem = (req: express.Request, res: express.Response) => {

        let PIB = req.body.companyPIB

        ItemModel.findOne({"itemId": req.body.itemId, "companyPIB": PIB}, (err, item)=>{
            if(err) console.log(err)
            if(item){
                res.json({'message': 'Item ID taken'})
            } else {

                let item = new ItemModel()
                item.companyPIB = req.body.companyPIB
                item.itemId = req.body.itemId
                item.itemName = req.body.itemName
                item.unitOfMeasure = req.body.unitOfMeasure
                item.taxRate = req.body.taxRate
                item.type = req.body.type
                item.image = req.body.image
                item.countryOfOrigin = req.body.countryOfOrigin
                item.foreignItemName = req.body.foreignItemName
                item.barcodeNumber = req.body.barcodeNumber
                item.producer = req.body.producer
                item.customsRate = req.body.customsRate
                item.ekoTax = req.body.ekoTax
                item.excise = req.body.excise
                item.minItems = req.body.minItems
                item.maxItems = req.body.maxItems
                item.description = req.body.description
                item.declaration = req.body.declaration

                ItemModel.collection.insertOne(item, (err, resp) =>{
                    if(err) console.log(err)
                    else {
                        
                        let itemStats = req.body.itemStats
                        let itemStatsStore = req.body.itemStatsStore
                        ItemStatsModel.collection.insertMany(itemStats, (err, resp)=>{
                            if(err) console.log(err)
                            else {
                                ItemStatsModel.collection.insertMany(itemStatsStore, (err, resp)=>{
                                    if(err) console.log(err)
                                    else res.json({'message': 'Item added'})
                                })
                            }
                        })

                    }
                })
            }
        })     
    }

    createCategory = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        let name = req.body.name

        CategoryModel.find({'PIB': PIB, 'name': name}, (err, category)=>{
            if(err) console.log(err)
            else {
                if(!category){
                    res.json({'message': 'Category already exists'})
                } else {
                    CategoryModel.collection.insertOne(req.body, (err, resp)=> {
                        if(err) console.log(err)
                        else res.json({'message': 'Category added'})
                    })
                }
            }
        })
    }

    getMyCategories = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        CategoryModel.find({"PIB": PIB}, (err, category)=>{
            if(err) console.log(err)
            else res.json(category)
        })
    }

    getMyRegisters = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        WorkingRegisterModel.find({"companyPIB": PIB}, (err, category)=>{
            if(err) console.log(err)
            else res.json(category)
        })
    }

    getMyStores = (req: express.Request, res: express.Response) => {
        let PIB = req.body.PIB
        StoreModel.find({"companyPIB": PIB}, (err, stores)=>{
            if(err) console.log(err)
            else res.json(stores)
        })
    }

    searchItem = (req: express.Request, res: express.Response) => {
        let itemName = req.body.itemName
        let PIB = req.body.PIB
        ItemModel.find({"itemName": {$regex: itemName}, 'companyPIB': PIB}, (err, items)=>{
            if(err) console.log(err)
            else res.json(items)
        })
    }

    setItemCategory = (req: express.Request, res: express.Response) => {
        let itemName = req.body.itemName
        let PIB = req.body.PIB
        let producer = req.body.producer
        let category = req.body.category
        ItemModel.findOne({"itemName": itemName, 'companyPIB': PIB, 'producer': producer}, (err, items)=>{
            if(err) console.log(err)
            else {
                if(!items.category){
                    ItemModel.updateOne({"itemName": itemName, 'companyPIB': PIB, 'producer': producer}, {$set: {'category': category}}, 
                    (err, resp) => {
                        if(err) console.log(err)
                        else res.json({'message': 'Category set!'})
                    })
                } else{
                    res.json({'message': 'Already has category'})
                }
            }
        })
    }

    getMyPlaces = (req: express.Request, res: express.Response) => {
        let companyName = req.body.companyName
        ItemStatsModel.find({"companyName": companyName}, (err, itemStats)=>{
            if(err) console.log(err)
            else res.json(itemStats)
        }).distinct('place')
    }

    getItemStats = (req: express.Request, res: express.Response) => {
        let companyName = req.body.companyName
        let place = req.body.place
        ItemStatsModel.find({"companyName": companyName, 'place': place}, (err, itemStats)=>{
            if(err) console.log(err)
            else res.json(itemStats)
        })
    }

    giveReceipt = (req: express.Request, res: express.Response) => {
       
        let dateReview = new Date(req.body.dateReview)
        let companyPIB = req.body.companyPIB
        let companyName = req.body.companyName

        DailyReviewModel.findOne({'date': dateReview, 'companyPIB': companyPIB, 'companyName': companyName}, (err, DR) =>{
            if(err) console.log(err)
            else {
                if(DR){
                    let itemStats = req.body.selectedItems
                    for(let i =0; i < itemStats.length; i++){

                        ItemStatsModel.updateOne({'place': itemStats[i].place, 'itemName': itemStats[i].itemName, 'companyName': itemStats[i].companyName,
                        'itemProducer': itemStats[i].itemProducer}, {$inc: {currentState: -itemStats[i].currentState}}, 
                        (err, resp) => {
                            if(err) console.log(err)
                            else console.log("ok")
                        })
                    }

                    let receipt = new ReceiptModel()
                    receipt.companyName= req.body.companyName
                    receipt.companyPIB= req.body.companyPIB
                    receipt.selectedItems = req.body.selectedItems
                    receipt.paymentType = req.body.paymentType
                    receipt.amountToPay = req.body.amountToPay
                    receipt.tax = req.body.tax
                    receipt.change = req.body.change
                    receipt.idCard = req.body.idCard
                    receipt.firstNameBuyer = req.body.firstNameBuyer
                    receipt.lastNameBuyer = req.body.lastNameBuyer
                    receipt.creditCardSlip = req.body.creditCardSlip
                    receipt.virmanCustor = req.body.virmanCustomer
                    receipt.date = req.body.date
                    ReceiptModel.collection.insertOne(receipt, (err,resp)=> {
                        if(err) console.log(err)
                        else {
                            DailyReviewModel.updateOne({'date': dateReview, 'companyPIB': companyPIB}, {$inc: {tax: receipt.tax, 
                                moneyEarned: receipt.amountToPay}}, (err, resp) => {
                                if(err) console.log(err)
                                else res.json({'message': 'Receipt successfully added'})
                            })
                        }
                    })

                } else {
                    let DRtemp = new DailyReviewModel()
                    DRtemp.companyPIB = req.body.companyPIB
                    DRtemp.companyName = req.body.companyName
                    DRtemp.tax = req.body.tax
                    DRtemp.moneyEarned = req.body.amountToPay
                    DRtemp.date = dateReview
                    DailyReviewModel.collection.insertOne(DRtemp, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            let itemStats = req.body.selectedItems
                            for(let i =0; i < itemStats.length; i++){

                                ItemStatsModel.updateOne({'place': itemStats[i].place, 'itemName': itemStats[i].itemName, 
                                'itemProducer': itemStats[i].itemProducer}, {$inc: {currentState: -itemStats[i].currentState}}, 
                                (err, resp) => {
                                    if(err) console.log(err)
                                    else console.log("ok")
                                })
                            }

                            let receipt = new ReceiptModel()
                            receipt.companyName= req.body.companyName
                            receipt.companyPIB= req.body.companyPIB
                            receipt.selectedItems = req.body.selectedItems
                            receipt.paymentType = req.body.paymentType
                            receipt.amountToPay = req.body.amountToPay
                            receipt.tax = req.body.tax
                            receipt.change = req.body.change
                            receipt.idCard = req.body.idCard
                            receipt.firstNameBuyer = req.body.firstNameBuyer
                            receipt.lastNameBuyer = req.body.lastNameBuyer
                            receipt.creditCardSlip = req.body.creditCardSlip
                            receipt.virmanCustor = req.body.virmanCustomer
                            receipt.date = req.body.date
                            ReceiptModel.collection.insertOne(receipt, (err,resp)=> {
                                if(err) console.log(err)
                                else res.json({'message': 'Receipt successfully added'})
                            })
                        }
                    })
                }
            }
        })
    }

    getMyDailyReviews = (req: express.Request, res: express.Response) => {
        let companyPIB = req.body.companyPIB
        DailyReviewModel.find({'companyPIB': companyPIB}, (err, dailyReviews)=>{
            if(err) console.log(err)
            else res.json(dailyReviews)
        }).distinct('date')
    }

    getDailyReview = (req: express.Request, res: express.Response) => {
        let companyPIB = req.body.companyPIB
        let date = req.body.date

        DailyReviewModel.findOne({'companyPIB': companyPIB, 'date': date}, (err, dailyReviews)=>{
            if(err) console.log(err)
            else res.json(dailyReviews)
        })
    }

}