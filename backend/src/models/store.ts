import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Store = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    companyPIB: {
        type: Number
    },
    location:{
        type: String
    },
    numRegisters:{
        type: Number
    }
})

export default mongoose.model('StoreModel', Store, 'stores')