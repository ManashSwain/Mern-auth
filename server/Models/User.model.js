import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : {
    type : String ,
    required : true,
   },
  email : {
    type : String ,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isEmailVerified : {
    type : Boolean,
    default : false
  },
  emailVerificationOtp : {
    type : String,
    default : ""
  },
  emailVerificationOtpExpiresAt : {
    type : Number,
    default : 0
  },
  resetOtp : {
    type : String ,
    default : "",
  },
  resetOtpExpiresAt : {
    type : Number,
    default : 0
  }
}, {timestamps : true});

const userModel = mongoose.models.User ||  mongoose.model("User" , userSchema);

export default userModel
