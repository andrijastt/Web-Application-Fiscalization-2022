import mongoose from "mongoose";

const Schema = mongoose.Schema;

let SubCategory = new Schema({
    PIB:{
        type: Number
    },
    name: {
        type: String
    },
    subcategory: {
        type: String
    }
})

export default mongoose.model('SubCategoryModel', SubCategory, 'subcategory')