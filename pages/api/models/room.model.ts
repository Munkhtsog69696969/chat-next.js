import mongoose from "mongoose";

const {Schema}= require("mongoose");

const roomSchema=new Schema({
    id:{
        type:String,
        required:[true,"id is required"],
    },
    messages:[{
        type:Object,
    }]
});

const Room=mongoose.models.Room || mongoose.model("Room",roomSchema);

export default Room;