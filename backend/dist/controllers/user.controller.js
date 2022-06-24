"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const company_1 = __importDefault(require("../models/company"));
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
                user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'Password changed!' });
                });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map