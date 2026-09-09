import mongoose from "mongoose";


export const connectDB = async ()=>{
   mongoose.connect("mongodb+srv://jainnikhil0708_db_user:uEXzdyWXc8NQmfjY@cluster0.nti9jez.mongodb.net/libraryManagement").then(
    ()=>{
        console.log("DB Connected");
        
    }
   );
   
}