import express from "express";
import { getUserA, getUsers, postUser, updateStates, updateStatesBreak } from "../controllers/user.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import user from '../models/user.js'
import {login, logout} from '../controllers/auth.js';

//import { verifyJWT } from "../middleware/verifyJWT.js";




const router = express();
//router.use(verifyJWT);

router.get('/users', async (req, res)=>{
    try{
        const users= await getUsers();
        //const users = await user.find();
        res.status(200).send(users);
    }catch(e){
      res.status(404)
    }
    
})
router.post('/register', async (req, res)=>{
  //console.log(req.body)
  try{
    await postUser(req);
    res.status(200).send("ok")
  }catch(e){
    console.log(e);
  }
})

router.post('/auth', loginLimiter, login)

//router.get('/refresh', refresh)

router.post('/logout',logout)
router.get('/userA', async (req, res)=>{
  try{
    let user = await getUserA(req);
    return res.json(user)
  }catch(e){
    res.status(404).send("something happend")
  }
  
})
router.post('/updateStates', async (req, res)=>{
  try{
    await updateStates(req)
    res.status(200).send("ok")
  }catch(e){
    console.log(e);
  }
  
  
  
})
router.post('/updateStatesBreak', async (req, res)=>{
  try{
    await updateStatesBreak(req)
    res.status(200).send("ok")
  }catch(e){
    console.log(e);
  }
  
})



export default router;