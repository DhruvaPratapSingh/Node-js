const express=require("express");
const data=require("./MOCK_DATA.json")
const app=express();

app.get("/api/users",(req,res)=>{
    return res.json(data);
});
app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=data.find((user)=>user.id===id);
    return res.json(user);
});
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${data.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
const PORT=8000;
app.listen((PORT),()=>{
    console.log(`server is successfully run at port ${PORT}`);
})