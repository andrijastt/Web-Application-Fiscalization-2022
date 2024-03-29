import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        type: String
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
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    }
})

export default mongoose.model('ItemModel', Item, 'items')