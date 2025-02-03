import express from "express";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv" ;
import cors from "cors";
import cookieParser from "cookie-parser";

// dotenv configuration
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


// database connection function 
connectDB();

// middlewares 
app.use(express.json());
app.use(cors({credentials : true}));
app.use(cookieParser());

app.get("/" , (req,res)=>{
   res.status(200).send("Hello from server!");
})


app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`);
})