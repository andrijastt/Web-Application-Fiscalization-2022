"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
// 0 - kupac
// 1 - preduzece
// 2 - admin
//# sourceMappingURL=user.js.map