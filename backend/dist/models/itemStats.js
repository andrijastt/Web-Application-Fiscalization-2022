"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ItemStats = new Schema({
    place: {
        type: String
    },
    typeOfPlace: {
        type: String
    },
    companyName: {
        type: String
    },
    unitOfMeasure: {
        type: String
    },
    itemName: {
        type: String
    },
    itemProducer: {
        type: String
    },
    purchasePrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    currentState: {
        type: Number
    },
    minWantingNumber: {
        type: Number
    },
    maxWantingNumber: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ItemStatsModel', ItemStats, 'itemStats');
// itemName: string
//     itemProducer: string
//     purchasePrice: number
//     sellingPrice: number
//     currentState: number
//     minWantingNumber: number
//     maxWantingNumber: number
//# sourceMappingURL=itemStats.js.map