import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDb from "./configs/connectdb.js";
import { webhook } from "./middlewares/webhook.js";
const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();




app.post("/clerk",webhook)
app.get("/",(req,res)=>{
    res.send("Server is running")
})













app.listen(process.env.PORT,()=>{
 ConnectDb();
console.log(`Server is running on port ${process.env.PORT}`)


})