"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Review = new Schema({
    companyPIB: {
        type: Number
    },
    tax: {
        type: Number
    },
    date: {
        type: String
    },
    moneyEarned: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('CategoryModel', Review, 'category');
//# sourceMappingURL=review.js.map