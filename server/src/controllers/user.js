import axios from 'axios';
import User from '../models/user.js'


export const getUsers = async (req, res)=>{
    try{
       let users = await User.find()
        
        if(users)return users
    }catch(e){
        const y = e;
        console.log(y)
        return y;
    }
}
export const getUserA = async (req, res)=>{
    let { name } = req.query
    //console.log(name)
    //console.log(userA)
  
    try{
        let userAfound = await User.find({name:name})
        //console.log(userAfound)
        if(userAfound) return userAfound
    }catch(e){
        return e
    }
}

export  const postUser = async (req, res) => {
  
    let {
        user,
        name,
        surname,
        workGroup,
        userType,
        pwd

    } = req.body
    //console.log(userType)
   if(userType=='A') pwd = 'staticpwd'
    const states ={
        breaks: 0,
        counter:0
    }
    try{
        return  await User.create({
            user,
            name,
            surname,
            workGroup,
            userType,
            pwd,
            states
        })
        
        //newuser.save()
    }catch(e){
       return e
    }
}
export const updateStates = async (req, res) =>{
    
   let { user, counter} = req.body;
   
    let userAfound = await User.updateOne(
        {name: user.userName},
        { $set: {counter:counter+1}}
    )
    if(userAfound){
        return userAfound
    }else{
        return 'NO FUNCIONA'
    } 

}
export const updateStatesBreak = async (req, res) =>{
    
    let { user, breaks} = req.body;
    
     let userAfound = await User.updateOne(
         {name: user.userName},
         { $set: {breaks:breaks+1}}
     )
     if(userAfound){
         return userAfound
     }else{
         return 'NO FUNCIONA'
     } 
 
 }
