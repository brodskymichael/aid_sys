import axios from 'axios';
import Settings from '../models/settings.js';


export const updateSettings = async (req, res) =>{
    
    let { sampling_cycle, count_ref_number} = req.body;

    let actual_settings = await Settings.updateOne(

    { $set: {sampling_cycle:sampling_cycle, count_ref_number:count_ref_number}}
    )
    if(actual_settings){
        return actual_settings
    }else{
        return 'cannot update settings'
    } 

}
export const settingRegistration = async (req, res) =>{
    let { new_user} = req.body;
    let actual_settings = await Settings.updateOne(
      
        { $set: {new_user:new_user}}
        )
        if(actual_settings){
            return actual_settings
        }else{
            return 'cannot update settings'
        } 
}
export const getSettings = async (req, res) =>{
    
   try{
    let actual_settings = await Settings.findOne()
    
    return actual_settings;
   }catch(e){
    return e;
   }
    
         
}