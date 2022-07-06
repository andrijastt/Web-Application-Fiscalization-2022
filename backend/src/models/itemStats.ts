import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ItemStats = new Schema({ 
    storageUnit: {
        type: String
    },
    companyName: {
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
})

export default mongoose.model('ItemStatsModel', ItemStats, 'itemStats')

// itemName: string
//     itemProducer: string
//     purchasePrice: number
//     sellingPrice: number
//     currentState: number
//     minWantingNumber: number
//     maxWantingNumber: number