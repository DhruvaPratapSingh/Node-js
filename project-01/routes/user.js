const express = require("express");
const {HandleGetUser,HandleupdateUserbyId,HandlegetUserbyId,
    HandledeleteUserbyId,
    HandleCreateNewUser
}=require("../controllers/user")

const router= express.Router();
// Route for individual user actions
router.route("/:id")
.get(HandlegetUserbyId)
.patch(HandleupdateUserbyId)
.delete(HandledeleteUserbyId);


// router.get("/", HandleGetUser)
// router.post("/",HandleCreateNewUser)
// if same route the ⤵️
router.route("/")
.get(HandleGetUser)
.post(HandleCreateNewUser)
    
// Removed the second middleware that ends the request prematurely
/*
app.use((req, res, next) => {
    console.log("Request listening 2..", req.myUserName);
    return res.end("hello");
});
*/

module.exports=router;