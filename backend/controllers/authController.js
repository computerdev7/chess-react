import User from "../database/models/userModal.js";
import express from "express";

let route = express.Router();

route.post('/reg', async(req, res)=> {
    let {username, password} = req.body;
    try {
        let findUser = await User.findOne({username})
        if(findUser) {
            res.status(403).json({message: "username already exist"})
        }
        let userData = new User({username, password})
        console.log(userData)
        await userData.save()
        console.log('success')
        res.status(201).json({message: "user created"})
    }catch(err){
        console.log('unsuccess')
        res.status(500).json({message: "error in user registration"})
    }
})

route.post('/login', async(req,res)=> {
    let {username, password} = req.body;
    try{
        let findUser = await User.findOne({username})
        if(findUser){
            if(findUser.password === password){
                res.status(200).json({message: "successfully login"})
            }
        }else {
            res.status(403).json({message: "username not found"})
        }

    }catch(err){
        res.status(500).json({message: "error in user login"})
    }
})


export default route