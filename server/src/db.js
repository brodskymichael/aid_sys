import user from './models/user.js';
import mongoose from 'mongoose';
import { getUsers } from './controllers/user.js';


export async function dbConn(){

    //const url = 'mongodb://127.0.0.1:27017/spec'
    const url = 'mongodb+srv://spec:12345@cluster0.npwwug2.mongodb.net/?retryWrites=true&w=majority'

   mongoose.connect(url,{
    })
    .then(() => {
        console.log('Database connected to ATLAS')
    }).catch((e) => {
        console.error('Connection Error: ', e)
    })

}