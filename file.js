const fs=require("fs");
const  express =require("express");
const exp = require("constants");

// syncronous call
// fs.writeFileSync("./text.txt","kya bat hai")
// async
// fs.writeFile("./test.txt","hey you wanna to do something",(err)=>{
//     console.log(err);
// })
// console.log(fs.readFileSync("./text.txt","utf-8"));

// console.log(fs.statSync("./test.txt"));

// fs.appendFile("./text.txt","ohh no\n",(err,res)=>{
//     if(err)console.log("err is found",err);
//     else console.log(res);
// })

const app=express();
const data=require("./project-01/MOCK_DATA.json");
app.use(express.urlencoded({extended:false}));

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${data.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    
    res.send(html);
})

app.get('/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=data.find((user)=>user.id===id);
    // res.end(`data send of user id ${id}`);
    if(!user) return res.status(404).json({msg:"user not found"})
    return res.json(user);
})
app.post("/api/user",(req,res)=>{
    const body=req.body;
    if(!body.first_name || !body.last_name){
        return res.status(401).json({msg:"all fields are required!"})
    }
    data.push({...body,id:data.length+1});
    fs.writeFile("./project-01/MOCK_DATA.json",
        JSON.stringify(data),(err)=>{
            console.log(`data succefully upload at ${data.length+1} method: ${req.method}`)
            console.log(req.body)
            return res.status(201).json({status:"200 success",id:data.length+1});
        }
    )
}
)
app.listen(8000,()=>{
    console.log("connection is succefully run at port 8000");
})