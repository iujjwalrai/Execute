const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resume: Buffer,
    skills : {
        type : [String],
        default : [""],
        // required : true
    },
    interests : {
        type : String, 
        // required : true
    },
    city : String,
    country : String,
    experience : {
        type : String,
        required : false
    },
    result : {
        type : String,
    }
});

module.exports = mongoose.model("user" , userSchema);