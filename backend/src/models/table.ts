import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    },
    department: {
        type: String
    }
})

export default mongoose.model('TableModel', Table, 'tables')