

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id:{type:mongoose.Schema.Types.ObjectId},
  role:{
    type:String,
    require:true

  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String, //data type of the field
    required: [true,"please enter password"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
 
});
const User = mongoose.model("User", userSchema);

module.exports = User;
