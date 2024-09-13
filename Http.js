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
// const http=require("http");
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
//     if(req.url==="/favicon.ico") return res.end();
//     const log=`no one`;
//     fs.appendFile("./test.txt",log,(err,data)=>{
//      switch(req.url){
//         case "/":
//             res.end("Home page");
//             break;
//         case "/about":
//             res.end("about page");
//             break; 
//         default :
//             res.end("page not found !")  
//             break;     
//     }
// });
// })
// server.listen(4000,()=>{
//     console.log(`server is ruuning at port ${4000}`);
// })
const http=require("http");
const fs=require("fs");
const url =require("url");
// http://localhost:4000/about?myname=dhes&userid=1
const server=http.createServer((req,res)=>{ 
    if(req.url==="/favicon.ico") return res.end();
    const myurl=url.parse(req.url,true);
    const log=`hello ${req.url} new req recieved\n`
    console.log(myurl);
    fs.appendFile("./test.txt",log,(err,data)=>{
     switch(myurl.pathname){
        case "/":
            res.end("Home page");
            break;
        case "/about":
            const user=myurl.query.myname;
            res.end(`Hi, myself ${user}`);
            break; 
        case "/search":
            // http://localhost:4000/search?search_query=tic+tac+toe
            const search=myurl.query.search_query;
            res.end("here your serach for " + search);    
        default :
            res.end("page not found !")  
            break;     
    }
});
})
server.listen(4000,()=>{
    console.log(`server is ruuning at port ${4000}`);
})