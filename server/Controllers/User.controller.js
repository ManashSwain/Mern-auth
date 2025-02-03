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

    return res.status(201).json({success : true , message : "Registered successfully"})
   }catch(err){
    console.error("Error occured : " , err);
    res.status(500).json({success : false , message : "Error occured during registration process"})
   }
   
}

// Login user function 

export const loginUser = async (req,res)=>{
    const {email , password} = req.body ;
  
    if(!email || !password){
      return res.status(400).json({success : false , message : "All fields are mandatory"});
    }
  
    try {
      const user = await userModel.findOne({email});

      if(!user){
        return res.status(404).json({success : false , message : "User is not present in database"});
      }
     
       const isMatch = await bcrypt.compare( password ,user.password );

          if(!isMatch){
            res.status(401).json({success : false , message : "Password is not matching"});
          }

         const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '7d'});

         res.cookie('token' , token , {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production" ,
            sameSite : process.env.NODE_ENV === "production" ? 'none' : "strict", 
            maxAge :  7 *24 * 60* 60*1000
         })

         res.status(200).json({success : true , message : "Loggedin successfully"})
    }
    catch(err){
    console.error("Error Occured : " , err);
    res.status(500).json({success : false , message : "Error occured during Login process"});
    }
  }

//   logout functionality 

export const logoutUser = async (req, res)=>{
   try {
    res.clearCookie('token' , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production" ,
        sameSite : process.env.NODE_ENV === "production" ? 'none' : "strict",  
    });
    return res.status(200).json({success : true , message : "User Loggedout successfully"});
   }
   catch(err){
    console.error("Error occured : " , err);
    res.status(500).json({success : false , message : "Error Occured"})
   }
}
  