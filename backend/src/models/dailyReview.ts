import mongoose from "mongoose";

const Schema = mongoose.Schema;

let DailyReview = new Schema({
    companyPIB:{
        type: Number
    },
    companyName:{
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
})

export default mongoose.model('DailyReviewModel', DailyReview, 'dailyReviews')