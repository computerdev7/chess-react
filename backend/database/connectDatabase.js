import mongoose from "mongoose";

let connectToDb = async() => {
    try{
        mongoose.connect('mongodb+srv://upadhyayakash:1l3iq1xDbBPPlDfN@cluster0.r1b3wb7.mongodb.net/?appName=Cluster0')
        console.log('connection successfull')
    }catch(err){
        console.log('connection failed')
    }
}

export default connectToDb;