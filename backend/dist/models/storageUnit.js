"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let StorageUnit = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    companyPIB: {
        type: Number
    },
    items: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('StorageUnitModel', StorageUnit, 'storageUnits');
//# sourceMappingURL=storageUnit.js.map