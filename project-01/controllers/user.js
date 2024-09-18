const User=require("../models/user")
const HandleGetUser=async(req,res)=>{
    const allDbusers=await User.find({})
    return res.json(allDbusers);
}
async function HandlegetUserbyId(req,res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    return res.json(user);
}
async function HandleupdateUserbyId(req,res) {
    const user=await User.findByIdAndUpdate(req.params.id,{lastName:"gupta"});
        return res.json({ status: "success" });
}
async function HandledeleteUserbyId(req,res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" });
    }
    // POST route to add new user using Mongoose
async function HandleCreateNewUser(req,res) {
    const body = req.body;
    // Validate required fields
    if (!body.firstName || !body.lastName) {
        return res.status(400).json({ msg: "All fields are required!" });
    }
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        });

        console.log(result);
        res.status(201).json({ msg: "Success", userId: result._id });
};

module.exports={
    HandleGetUser,
    HandlegetUserbyId,
    HandleupdateUserbyId,
    HandledeleteUserbyId,
    HandleCreateNewUser

}