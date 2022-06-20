"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RegisterCompany = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    telephoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postNumber: {
        type: Number
    },
    streetName: {
        type: String
    },
    streetNumber: {
        type: Number
    },
    PIB: {
        type: Number
    },
    JMBP: {
        type: Number
    },
    imageData: {
        type: String
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RegisterCompanyModel', RegisterCompany, 'registerCompany');
//# sourceMappingURL=registerCompany.js.map