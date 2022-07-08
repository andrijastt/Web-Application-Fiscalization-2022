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
                       
                        ItemStatsModel.collection.insertMany(itemStats, (err, resp)=>{
                            if(err) console.log(err)
                            else res.json({'message': 'Item added'})
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
                console.log(category)
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
}