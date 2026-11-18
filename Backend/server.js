import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDb from "./configs/connectdb.js";
import { webhook } from "./middlewares/webhook.js";
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();




app.post("/clerk",express.json(),webhook)
app.get("/",(req,res)=>{
    res.send("Server is running")
})













app.listen(process.env.PORT,()=>{
 ConnectDb();
console.log(`Server is running on port ${process.env.PORT}`)


})