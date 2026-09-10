import mongoose from "mongoose";


export const connectDB = async ()=>{
   mongoose.connect(process.env.MONGO_DB_URI).then(
    ()=>{
        console.log("DB Connected");
        
    }
   );
   
}