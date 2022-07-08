import mongoose from "mongoose";

const Schema = mongoose.Schema;

let WorkingRegister = new Schema({ 
    companyPIB: {
        type: Number
    },
    type: {
        type: String
    },
    location: {
        type: String
    }
})

export default mongoose.model('WorkingRegisterModel', WorkingRegister, 'workingRegister')