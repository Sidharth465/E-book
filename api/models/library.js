const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  userId: {
    type:String,
    require: true,
    
  },
  bookname:{
    type:String,
    required:true,
    
  },
  url:{
    type : String ,
    required:true
  },
  author:{
    type:String,required: true
  }



});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
