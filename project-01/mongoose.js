const mongoose =require("mongoose")
const express=require ("express");

const app=express();
app.use(express.urlencoded({extended:false}));
mongoose.connect('mongodb://127.0.0.1:27017/nodejstube')
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=>console.log("err to connect db",err));


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle: {
        type: String
    },
},{timestamps:true});

const User= mongoose.model("nodestore",UserSchema);

app.post("/api/data",async(req,res)=>{
    const body=req.body;
    const result= await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    })
    console.log(result);
    res.status(201).json({msg:"success"});
})

app.listen(4000,()=>{
    console.log("connection is running in port 4000");
})