import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ActivityCodes = new Schema({ 
    code: {
        type: Number
    },
    name: {
        type: String
    }
})

export default mongoose.model('ActivityCodesModel', ActivityCodes, 'activityCodes')