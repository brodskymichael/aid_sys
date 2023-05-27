import { Schema, model, Mongoose } from "mongoose";


const MessageSchema = new Schema({
    body: {
        type: String,
    },
    image:{
        type: String,
    },
    video:{
        type: String,
    },
    receptorid:{
        type:Schema.ObjectId,
    },
    emisorid:{
        type:Schema.ObjectId,
    },
    seen:{
        type: Boolean,
        default: false
    }
    
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("Message", MessageSchema);

export default newstModel;