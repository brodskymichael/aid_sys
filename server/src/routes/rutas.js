import express from "express";
import { getUserA, getUsers, postUser, updateStates, updateStatesBreak,sendQuestion, changeMood, deleteUser} from "../controllers/user.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import user from '../models/user.js'
import {login, logout} from '../controllers/auth.js';
import { markSeen, postMessage, receivedMessages, sendMessages } from "../controllers/message.js";

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
router.post('/postmessage', async (req, res)=>{
  try{
    await postMessage(req)
    res.status(200).send("ok")
  }catch(e){
    console.log(e);
  }
  
})
router.get('/getreceivedmsg', async (req, res)=>{
  try{
    let receivedmsgs = await receivedMessages(req);
    return res.json(receivedmsgs)
  }catch(e){
    res.status(404).send("something happend")
  }
})
router.get('/getsendmsg', async (req, res)=>{
  try{
    let sendmsgs = await sendMessages(req);
    return res.json(sendmsgs)
  }catch(e){
    res.status(404).send("something happend")
  }
})
router.post('/markseen', async (req, res)=>{
  try{
    let seenmsg = await markSeen(req);
    return res.json(seenmsg)
  }catch(e){
    res.status(404).send("something happend", e)
  }
})

router.post('/sendquestion', async (req, res)=>{
  try{
    let quest = await sendQuestion(req);
    return res.json(quest)
  }catch(e){
    res.status(404).send("something happend", e)
  }
})
router.post('/changemood', async (req, res)=>{
  try{
    let mood = await changeMood(req);
    return res.json(mood)
  }catch(e){
    res.status(404).send("something happend", e)
  }
})
router.post('/deleteUser', async (req, res)=>{
  try{
    let deleteuser = await deleteUser(req);
    return res.json(deleteuser)
  }catch(e){
    res.status(404).send("something happend", e)
  }
})


export default router;