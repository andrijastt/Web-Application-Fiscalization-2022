import mongoose from "mongoose";

const Schema = mongoose.Schema;

let StorageUnit = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    companyPIB: {
        type: Number
    },
    items: {
        type: Array
    }
})

export default mongoose.model('StorageUnitModel', StorageUnit, 'storageUnits')