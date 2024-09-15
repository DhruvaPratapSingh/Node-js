
const express=require("express");

const app=express();
app.get('/',(req,res)=>{
    return res.send("hello from home page");
})
app.get("/about",(req,res)=>{
    res.send("hello from aboutpage"+" hey "+ req.query.name);//http://localhost:4000/about?name=dhruva
})
app.listen(4000,()=>{
    console.log(`server is ruuning at port ${4000}`);
})