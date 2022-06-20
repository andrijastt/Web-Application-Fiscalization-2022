import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RegisterCompany = new Schema({
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
        type: Number
    }, 
    imageData: {
        type: String
    }, 
    status: {
        type: String
    },
    firstTime: {
        type: Boolean
    }
})

export default mongoose.model('RegisterCompanyModel', RegisterCompany, 'registerCompany')