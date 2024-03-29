"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let DailyReview = new Schema({
    companyPIB: {
        type: Number
    },
    companyName: {
        type: String
    },
    tax: {
        type: Number
    },
    date: {
        type: Date
    },
    moneyEarned: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('DailyReviewModel', DailyReview, 'dailyReviews');
//# sourceMappingURL=dailyReview.js.map