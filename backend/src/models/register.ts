import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Register = new Schema({ 
    name: {
        type: String
    }
})

export default mongoose.model('RegisterModel', Register, 'registerModels')