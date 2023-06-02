import axios from 'axios';
import User from '../models/user.js';
import Settings from '../models/settings.js';
import History from '../models/history.js';

export const calculoDistress = async ()=>{
    try{
       let users = await User.find()
       let settings = await Settings.findOne()
       let count_ref_number_normalized = (settings.sampling_cycle * settings.count_ref_number)/60;
       users.map((e)=>{
        if(e.login_today !=0 && e.userType=='A'){
            let delta = e.counter-e.previous_counter;
            if(delta<count_ref_number_normalized*0.7){
                e.distress= true;
            }else{
                e.distress= false;
            }
            e.previous_counter=e.counter;
            e.save()
        }
       })
    }catch(e){
        const y = e;
        console.log(y)
        return y;
    }
}

export const reset = async ()=>{
    try{
        let users = await User.find()
        const today = new Date();
        const date = today.setDate(today.getDate()); 
        const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

        users.map(async (e)=>{
            if(e.userType=='A'){
                await History.create({
                counter: e.counter,
                breaks: e.breaks,
                user: e._id,
                username:e.name,
                day:defaultValue,
                work_time: e.work_time,
                break_time:e.break_time
                })
                e.login_today = 0;
                e.counter = 0;
                e.breaks = 0;
                e.previous_counter = 0;
                e.distress=false;
                e.mood=0;
                e.work_time=0;
                e.break_time=0;
                e.save();
            }
            
        })
    }catch(e){
        const y = e;
        console.log(y)
        return y;
    }
}
