// const http=require("http");
// const server=http.createServer((req,res)=>{
//     // console.log("hello sir good moring !");
//     console.log(req);
//     res.end("good luck!");
// })
// server.listen(4000,()=>{
//     console.log(`server is ruuning at port ${4000}`);
// })

// assignment 1;
const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
const log=`hello ${req.url}\n`;
fs.appendFile("./test.txt",log,(err,data)=>{
    res.end("good luck!");
});
})
server.listen(4000,()=>{
    console.log(`server is ruuning at port ${4000}`);
})