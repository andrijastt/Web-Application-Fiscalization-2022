"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
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
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map