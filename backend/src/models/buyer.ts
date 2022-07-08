import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Buyer = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }, 
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }, 
    telephoneNumber: {
        type: String
    },
    idCard: {
        type: String
    } 
})

export default mongoose.model('BuyerModel', Buyer, 'buyers')
