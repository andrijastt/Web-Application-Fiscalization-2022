import mongoose from "mongoose";

const Schema = mongoose.Schema;

let DailyReview = new Schema({
    companyPIB:{
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
})

export default mongoose.model('DailyReviewModel', DailyReview, 'dailyReviews')