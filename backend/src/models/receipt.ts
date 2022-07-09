import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Receipt = new Schema({
    companyName:{
        type: String
    },
    selectedItems: {
        type: Array
    },
    paymentType: {
        type: String
    }, 
    amountToPay: {
        type: Number
    },
    tax: {
        type: Number
    },
    change: {
        type: Number
    },
    idCard: {
        type: String
    }, 
    firstNameBuyer: {
        type: String
    }, 
    lastNameBuyer: {
        type: String
    },
    creditCardSlip: {
        type: String
    },
    virmanCustor: {
        type: String
    },
    date: {
        type: Date
    }
})

export default mongoose.model('ReceiptModel', Receipt, 'receipts')