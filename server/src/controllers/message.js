import Message from '../models/message.js';
import axios from 'axios';

export  const postMessage = async (req, res) => {
    let {
        body,
        image,
        video,
        receptorid,
        emisorid

    } = req.body
    try{
        return  await Message.create({
            body,
            image,
            video,
            receptorid,
            emisorid
        })
        
    }catch(e){
       return e
    }
}
export const receivedMessages = async (req, res) => {
    let {id} = req.query;
    
    try{
        let userAfound = await Message.find({receptorid:id})
        //console.log(userAfound)
        if(userAfound) return userAfound
    }catch(e){
        return e
    }
}
export const sendMessages = async (req, res) => {
    let {id} = req.query;
    
    try{
        let userAfound = await Message.find({emisorid:id})
        //console.log(userAfound)
        if(userAfound) return userAfound
    }catch(e){
        return e
    }
}
export const markSeen = async ( req, res) => {
   let {id_msg} = req.body;

   try{
        let msgfound = await Message.updateOne(
            {_id:id_msg},
            {$set: {seen:true}}
        );
        return msgfound
   }catch(e){
        return e
   }




   
}