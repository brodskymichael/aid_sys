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
    },
    counter: {
        type: Number,
    },
    mood:{
        type: Number
    }
    
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("User", UserSchema);

export default newstModel;