import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/" , (req,res)=>{
   res.status(200).send("Hello from server!");
})

app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`);
})