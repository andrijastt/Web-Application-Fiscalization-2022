"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Item = new Schema({
    companyPIB: {
        type: Number
    },
    itemId: {
        type: Number
    },
    itemName: {
        type: String
    },
    unitOfMeasure: {
        type: String
    },
    taxRate: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    foreignItemName: {
        type: String
    },
    barcodeNumber: {
        type: Number
    },
    producer: {
        type: String
    },
    customsRate: {
        type: Number
    },
    ekoTax: {
        type: Boolean
    },
    excise: {
        type: Boolean
    },
    minItems: {
        type: Number
    },
    maxItems: {
        type: Number
    },
    description: {
        type: String
    },
    declaration: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ItemModel', Item, 'items');
//# sourceMappingURL=item.js.map