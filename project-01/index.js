const express=require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs");
const app=express();

app.use(express.urlencoded({extended:false}))// middleware-plugin

// app.get("/api/users",(req,res)=>{
//     return res.json(users);
// });
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
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status:"Pending"});
})
.delete((req,res)=>{
    return res.json({status:"Pending"});
})
app.post("/api/users",(req,res)=>{
    const body=req.body;
    // console.log(req.body);
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        console.log("err occured to adding data in json file")
        return res.json({status:"Success",id:users.length+1});
    });
})
const PORT=8000;
app.listen((PORT),()=>{
    console.log(`server is successfully run at port ${PORT}`);
})