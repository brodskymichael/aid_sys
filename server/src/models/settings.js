import { Schema, model} from "mongoose";



const SettingsSchema = new Schema({
    sampling_cycle:{
        type:Number,
        default: 10
    },
    count_ref_number:{
        type: Number,
        default:20
    },
    new_user:{
        type: Boolean,
        default:true
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("Settings", SettingsSchema);

export default newstModel;