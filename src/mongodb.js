const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/mydb")
    
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

// create schema to create docs
const LoginSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',LoginSchema)

module.exports=LogInCollection  //important line