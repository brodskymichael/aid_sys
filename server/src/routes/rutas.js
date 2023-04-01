import express from "express";
import { getUsers } from "../controllers/user.js";
import user from '../models/user.js'

const router = express.Router();

router.get('/users', async (req, res)=>{

    try{
        const users= await getUsers();
        //const users = await user.find();
        res.json(users);
    }catch(e){
      res.status(404)
    }
    
})

export default router;