const mongoose = require("mongoose");

// MongoDB connection
async function connectdb(url){
return mongoose.connect(url)
    // .then(() => console.log("MongoDB connected successfully"))
    // .catch((err) => console.log("Error connecting to DB:", err));
}
module.exports={connectdb};
