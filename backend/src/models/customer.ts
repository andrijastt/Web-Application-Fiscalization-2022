import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Customer = new Schema({
    sellerPIB: {
        type: Number
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
    email: {
        type: String
    }, 
    name: {
        type: String
    }, 
    country: {
        type: String
    }, 
    city: {
        type: String
    }, 
    postNumber: {
        type: Number
    },
    streetName: {
        type: String
    }, 
    streetNumber: {
        type: Number
    }, 
    PIB: {
        type: Number
    }, 
    JMBP: {
        type: Number
    }, 
    imageData: {
        type: String
    },
    daysToPay: { 
        type: Number 
    },
    discount: {
        type:Number
    }
})

export default mongoose.model('CustomerModel', Customer, 'customers')