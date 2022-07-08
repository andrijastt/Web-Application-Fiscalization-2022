"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
const buyer_1 = __importDefault(require("../models/buyer"));
class AdminController {
    constructor() {
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = 2;
            user_1.default.findOne({ "username": username, "password": password, "type": type }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.insertUser = (req, res) => {
            buyer_1.default.findOne({ 'username': req.body.username }, (err, buyer) => {
                if (err)
                    console.log(err);
                else {
                    if (buyer) {
                        res.json({ 'message': 'User already in db' });
                    }
                    else {
                        buyer_1.default.collection.insertOne(req.body, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                let user = new user_1.default();
                                user.username = req.body.username;
                                user.password = req.body.password;
                                user.type = 0;
                                user_1.default.collection.insertOne(user, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        res.json({ 'message': 'Buyer added' });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map