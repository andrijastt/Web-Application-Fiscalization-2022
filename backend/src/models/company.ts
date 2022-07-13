import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Company = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
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
        type: String
    }, 
    imageData: {
        type: String
    }, 
    status: {
        type: String
    },
    firstTime: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    category: {
        type: String
    },
    activityCodes: {
        type: Array
    },
    PDV: {
        type: Boolean
    },
    bankAccounts: {
        type: Array
    },
    storageUnits: {
        type: Number
    },
    registers: {
        type: Array
    }
})

export default mongoose.model('CompanyModel', Company, 'companies')