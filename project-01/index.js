const express=require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs");
const app=express();


app.use(express.urlencoded({extended:false}))// middleware-plugin
app.use((req,res,next)=>{
    req.myUserName="dhruva"
    console.log("your req is listening..");
    // return res.json({msg:"hello from middleware"});
    fs.appendFile("./log.txt",
        `\n ${new Date().toLocaleDateString()} ${req.ip} ${req.path} ${req.method}`
   ,(err,data)=>{
       next();
   } )
});
// middleware - plugin
// app.use((req,res,next)=>{
//     console.log("your req is listening 2..",req.myUserName);
//     return res.end("hello");
// })
app.get("/api/users",(req,res)=>{
    return res.json(users);
});
// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=data.find((user)=>user.id===id);
//     return res.json(user);
// });
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
app
.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    if(!user)return res.status(404).json({msg:"user not found"})
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status:"Pending"});
})
.delete((req,res)=>{
    return res.json({status:"Pending"});
})
app.post("/api/users",async(req,res)=>{
    const body=req.body;
    // console.log(req.body);

    // post by using fs module
    if(!body.first_name || !body.last_name){
        return res.status(400).json({msg:"all fields are required!"})
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        console.log("err occured to adding data in json file")
        return res.json({status:"Success",id:users.length+1});
    });
});
const PORT=8000;
app.listen((PORT),()=>{
    console.log(`server is successfully run at port ${PORT}`);
})