const mongoose=require("mongoose");

const db=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connection established");
   }catch(error){
    console.log("error connecting to DB"+error);
   }
}
module.exports=db;