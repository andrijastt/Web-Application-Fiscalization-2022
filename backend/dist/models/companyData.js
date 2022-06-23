"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CompanyData = new Schema({
    category: {
        type: String
    },
    activityCodes: {
        type: Array
    },
    PDV: {
        type: Boolean
    },
    bankAccounts: {
        type: Array
    },
    storageUnits: {
        type: Number
    },
    registers: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('CompanyDataModel', CompanyData, 'companyData');
//# sourceMappingURL=companyData.js.map