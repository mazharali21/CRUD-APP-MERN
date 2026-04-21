const mongoose = require("mongoose");
const Counter = require("./counter");

const userSchema = new mongoose.Schema({
    userID: { type: Number, unique : true } ,
    name : {type : String, required : true},
    email : {type : String, required : true},
    location : {type : String, required : false}
})

userSchema.pre("save",async function(next){
    try{
    if(!this.isNew){
        return next();
    }

    const counter = await Counter.findOneAndUpdate(
    { id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

    this.userID = counter.seq;
    next();
    }catch(error){
    console.log({error : error.message});
}
    
})

module.exports = mongoose.model("User", userSchema);