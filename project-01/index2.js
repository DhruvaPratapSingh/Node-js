const express = require("express");
const users = require("./MOCK_DATA.json");
const userRouter=require("./routes/user")
const {connectdb} =require("./connection");
const {logreqres}=require("./middlewares");

connectdb("mongodb://127.0.0.1:27017/nodejstube")
.then((req)=>{
    console.log("mongodb conneected !");
})
const app = express();
// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON bodies
// middleware
// app.use(logreqres("./log.txt"));

//routes
app.use("/api/users",userRouter);
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
