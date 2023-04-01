import axios from 'axios';
import user from '../models/user.js'

export const getUsers = async (req, res)=>{
    try{
        let users = await user.find()
        return users
    }catch(e){
        console.log(e)
    }
}

export const postUser = async () => {
    
}
