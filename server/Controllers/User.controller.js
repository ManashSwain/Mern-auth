import userModel from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// User Registration 
export const registeruser = async(req,res)=>{
   const {name,email,password} = req.body ;

   if(!name || !email || !password){
     return res.status(400).json({success : false , message : "It is a required field"});
   };
   try{
    const user = await userModel.findOne({email});
   if(user){
       return res.status(409).json({success : false , message : "User already exists in database"});
   }
   const saltRounds = 12 ;
   const hashedPassword = await  bcrypt.hash(password , saltRounds);

   const newUser =await new userModel({
    name, email , password : hashedPassword
   })
   await newUser.save();

   const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET , {expiresIn : '7d'});

   res.cookie('token' , token , {
    httpOnly : true ,
    secure : process.env.NODE_ENV === "production",
    sameSite : process.env.NODE_ENV === "production" ? 'none' : "strict",
    maxAge : 7 *24 * 60* 60*1000
   });

   }catch(err){
    console.error("Error occured : " , err);
    res.status(500).json({success : false , message : "Error occured during registration process"})
   }
   
}

