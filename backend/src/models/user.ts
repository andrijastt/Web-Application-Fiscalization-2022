import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }, 
    type: {
        type: Number
    }
})

export default mongoose.model('UserModel', User, 'users')
// 0 - kupac
// 1 - preduzece
// 2 - admin