import { Schema, model } from "mongoose";

const userSchema = new Schema({
    mail: {
        type: String,
    },
    group:{
        type: String,
    } 
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("User", userSchema);

export default newstModel;