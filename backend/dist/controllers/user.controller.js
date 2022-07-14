"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const company_1 = __importDefault(require("../models/company"));
const itemStats_1 = __importDefault(require("../models/itemStats"));
const buyer_1 = __importDefault(require("../models/buyer"));
const receipt_1 = __importDefault(require("../models/receipt"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.get5latestReceipts = (req, res) => {
            receipt_1.default.find({}, (err, receipts) => {
                if (err)
                    console.log(err);
                else
                    res.json(receipts);
            }).sort({ date: -1 }).limit(5);
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                if (user.type == 1) {
                    company_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                        if (err)
                            console.log(err);
                    });
                }
                if (user.type == 0) {
                    buyer_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                        if (err)
                            console.log(err);
                    });
                }
                user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'Password changed!' });
                });
            });
        };
        this.getMyBuyer = (req, res) => {
            let username = req.body.username;
            buyer_1.default.findOne({ 'username': username }, (err, buyer) => {
                if (err)
                    console.log(err);
                else
                    res.json(buyer);
            });
        };
        this.getCheapestPrice = (req, res) => {
            let itemName = req.body.itemName;
            let producer = req.body.producer;
            let companyName = req.body.companyName;
            itemStats_1.default.find({ 'itemName': { $regex: itemName }, 'itemProducer': { $regex: producer }, 'currentState': { $ne: 0 },
                'companyName': companyName }, (err, items) => {
                if (err)
                    console.log(err);
                else {
                    res.json(items);
                }
            }).sort({ sellingPrice: 1 }).limit(1);
        };
        this.getDistinctPlace = (req, res) => {
            let itemName = req.body.itemName;
            let producer = req.body.producer;
            let companyName = req.body.companyName;
            itemStats_1.default.find({ 'itemName': { $regex: itemName }, 'itemProducer': { $regex: producer }, 'currentState': { $gt: 0 },
                'companyName': companyName }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            }).distinct("place");
        };
        this.searchItem = (req, res) => {
            let itemName = req.body.itemName;
            let producer = req.body.producer;
            itemStats_1.default.find({ 'itemName': { $regex: itemName }, 'itemProducer': { $regex: producer }, 'currentState': { $gt: 0 } }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            }).sort({ sellingPrice: 1 });
        };
        this.getMyItems = (req, res) => {
            let companyName = req.body.companyName;
            itemStats_1.default.find({ 'companyName': companyName, 'currentState': { $gt: 0 } }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            }).distinct("itemName");
        };
        this.getMyReceipts = (req, res) => {
            let idCard = req.body.idCard;
            receipt_1.default.find({ 'idCard': idCard }, (err, receipts) => {
                if (err)
                    console.log(err);
                else
                    res.json(receipts);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map