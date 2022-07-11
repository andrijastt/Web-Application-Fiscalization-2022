"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Table = new Schema({
    id: {
        type: Number
    },
    companyName: {
        type: String
    },
    companyPIB: {
        type: Number
    },
    storeName: {
        type: String
    },
    type: {
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    w: {
        type: Number
    },
    h: {
        type: Number
    },
    items: {
        type: Array
    },
    taken: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('TableModel', Table, 'tables');
//# sourceMappingURL=table.js.map