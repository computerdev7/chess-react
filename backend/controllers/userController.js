import express from "express"
import User from "../database/models/userModal.js";

let route = express.Router();

route.get('/:username',async(req, res)=> {
    let username =  req.params.username
    try{
        let findUserProfile = await User.findOne({username})
        if(findUserProfile){
            res.status(200).json({message : findUserProfile})
        } else {
            res.status(400).json({message : "user not found"})
        }
    }catch(err){
        res.status(500).json({message: 'server error cannot get profile'})
    }
})

route.put('/update', async(req,res)=> {
    let {username, result} = req.body
    try{
        let findUserProfile;
        if(result == 'win') {
            findUserProfile = await User.findOneAndUpdate({username}, {$inc: {win : 1}}, {new : true})
        }
        else if(result == 'loss') {
            findUserProfile = await User.findOneAndUpdate({username}, {$inc: {loss : 1}}, {new : true})
        }
        else if(result == 'draw') {
            findUserProfile = await User.findOneAndUpdate({username}, {$inc: {draw : 1}}, {new : true})
        } 
        res.status(201).json({message : "successfully updated the profile"})
    }catch(err){
        res.status(500).json({message: 'server error cannot update user profile'})
    }
})

export default route;
