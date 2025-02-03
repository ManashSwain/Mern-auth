import express from "express";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv" ;
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// middlewares 
app.use(express.json());

app.get("/" , (req,res)=>{
   res.status(200).send("Hello from server!");
})

// database connection function 
connectDB();

app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`);
})