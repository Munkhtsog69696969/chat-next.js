import type { NextApiRequest, NextApiResponse } from "next"
import connectDB from "./mongo/mongoConnect";
import Room from "./models/room.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case "POST":
        try{
          await connectDB();
          const room=await Room.findOne({id:req.body.id})

          if(!room){
            const newRoom=await Room.create({id:req.body.id});
            res.json(newRoom)
          }else{
            res.json(room)
          }
        }catch(err){
          console.log(err)
        }
        break;

      case "PUT":
        try{
          await connectDB();

          const room=await Room.findOne({id:req.body.id});

          if(room){
            room.messages.push(req.body.message);

            await room.save();
          }

          // res.send("new msg")
        }catch(err){
          console.log(err)
        }
    }
}