import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    if(mongoose.connection.readyState===0){
      await mongoose.connect("mongodb+srv://munkhtsogmoony:Munkhtsog2005@cluster0.wpp76wa.mongodb.net/");
      console.log("mongo connected")
    }
  }catch(err){
    console.log(err);
  }
}

export default connectDB