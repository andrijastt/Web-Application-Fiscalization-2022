"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Receipt = new Schema({
    companyName: {
        type: String
    },
    selectedItems: {
        type: Array
    },
    paymentType: {
        type: String
    },
    amountToPay: {
        type: Number
    },
    tax: {
        type: Number
    },
    change: {
        type: Number
    },
    idCard: {
        type: String
    },
    firstNameBuyer: {
        type: String
    },
    lastNameBuyer: {
        type: String
    },
    creditCardSlip: {
        type: String
    },
    virmanCustor: {
        type: String
    },
    date: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('ReceiptModel', Receipt, 'receipts');
//# sourceMappingURL=receipt.js.map