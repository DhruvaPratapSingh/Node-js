const fs=require("fs");
// syncronous call
// fs.writeFileSync("./text.txt","kya bat hai")
// async
// fs.writeFile("./test.txt","hey you wanna to do something",(err)=>{
//     console.log(err);
// })
// console.log(fs.readFileSync("./text.txt","utf-8"));

// console.log(fs.statSync("./test.txt"));

fs.appendFile("./text.txt","ohh no\n",(err,res)=>{
    if(err)console.log("err is found",err);
    else console.log(res);
})