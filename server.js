import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import connectDB from './config/dbconfig.js'
import authRoutes from './routes/authRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import CategoryRoutes from './routes/CategoryRoutes.js'


const app = express();


dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/product', productsRoutes);
app.use('/api/v1', CategoryRoutes);

app.get('/',(req ,res)=>{
    res.send('Ecommere backend APIs developed by imran shahid')
})
const  port = process.env.PORT || 4000;

app.listen(port , ()=>{
    console.log("serving is running on Port  " + port );

})