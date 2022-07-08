"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let WorkingRegister = new Schema({
    companyPIB: {
        type: Number
    },
    type: {
        type: String
    },
    location: {
        type: String
    }
});
exports.default = mongoose_1.default.model('WorkingRegisterModel', WorkingRegister, 'workingRegister');
//# sourceMappingURL=workingRegister.js.map