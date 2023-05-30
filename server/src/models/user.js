import { Schema, model, Mongoose } from "mongoose";



const UserSchema = new Schema({
    user: {
        type: String,
    },
    name:{
        type: String,
    },
    surname:{
        type: String,
    },
    workGroup:{
        type: Number,
    },
    userType:{
        type: String,
    },
    pwd:{
        type: String,
    },
    breaks:{ 
        type: Number,
        default: 0
    },
    counter: {
        type: Number,
        default:0
    },
    mood:{
        type: Number,
        default: 1
    },
    questionPending:{
        type:Boolean,
        default: false
    },
    login_today:{
        type: Number,
        default: 0
    },
    previous_counter:{
        type: Number,
        default:0
    },
    distress:{
        type: Boolean,
        default: false
    },
    on_break:{
        type:Boolean,
        default: false
    }
    
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("User", UserSchema);

export default newstModel;