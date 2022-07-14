import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Category = new Schema({
    PIB:{
        type: Number
    },
    name: {
        type: String
    }
})

export default mongoose.model('CategoryModel', Category, 'category')