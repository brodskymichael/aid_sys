import axios from 'axios';
import Settings from '../models/settings.js';


export const updateSettings = async (req, res) =>{
    
    let { sampling_cycle, count_ref_number} = req.body;

    let actual_settings = await Settings.updateOne(
    {_id: '6474e9212f031b0533e39b72'},
    { $set: {sampling_cycle:sampling_cycle, count_ref_number:count_ref_number}}
    )
    if(actual_settings){
    return actual_settings
    }else{
    return 'cannot update settings'
    } 

}