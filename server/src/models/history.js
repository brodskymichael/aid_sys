import { Schema, model} from "mongoose";


const   HistorySchema = new Schema({
    counter: {
        type: Number,
        default: 0
    },
    breaks:{
        type: Number,
        default: 0
    },
    user:{
        type:Schema.ObjectId,
    },
    username:{
        type:String,
    },
    day:{
        type:String
    }
    
},
    {
        timestamps: false,
        versionKey: false,
    });

const newstModel = model("History", HistorySchema);

export default newstModel;