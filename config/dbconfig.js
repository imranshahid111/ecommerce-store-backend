import mongoose from "mongoose";
 const connectDB = async()=>{
    try {
        const con = await  mongoose.connect(process.env.Mongo_URL);
        console.log(`MongoDB Connected: ${con.connection.host}`);


    } catch (error) {
        console.log("Error in connection to mongo")
    }
}
export  default connectDB;
