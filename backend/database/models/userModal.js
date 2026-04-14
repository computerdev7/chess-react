import mongoose from "mongoose";

let userModal = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    }, 
    password : {
        type : String,
        required : true
    }, 
})

let User = mongoose.model('User',userModal)

export default User;