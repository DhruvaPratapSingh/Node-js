const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/nodejstube')
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Error connecting to DB:", err));

// Mongoose schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle: {
        type: String
    }
});

// Mongoose model
const User = mongoose.model("node-user-data", UserSchema);

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON bodies

// Middleware for logging requests
app.use((req, res, next) => {
    req.myUserName = "dhruva";
    console.log("Request received...");
    
    fs.appendFile("./log.txt",
        `\n ${new Date().toLocaleDateString()} ${req.ip} ${req.path} ${req.method}`,
        (err, data) => {
            next();
        }
    );
});

// Removed the second middleware that ends the request prematurely
/*
app.use((req, res, next) => {
    console.log("Request listening 2..", req.myUserName);
    return res.end("hello");
});
*/

// Route to get all users
app.get("/api/users", async(req, res) => {
    const allDbusers=await User.find({})
    return res.json(allDbusers);
});

// Route to render user names in HTML
app.get("/users", async(req, res) => {
    const allDbusers=await User.find({})
    const html = `
    <ul>
        ${allDbusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
});

// Route for individual user actions
app.route("/api/users/:id")
.get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json(user);
})
    .patch(async(req, res) => {
        const user=await User.findByIdAndUpdate(req.params.id,{lastName:"rajput"});
        return res.json({ status: "success" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "success" });
    });

// POST route to add new user using Mongoose
app.post("/api/users", async (req, res) => {
    const body = req.body;

    // Validate required fields
    if (!body.firstName || !body.lastName) {
        return res.status(400).json({ msg: "All fields are required!" });
    }

    try {
        // Create a new user
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        });

        console.log(result);
        res.status(201).json({ msg: "Success", user: result });
    } catch (error) {
        // Handle errors (e.g., duplicate emails)
        console.error(error);
        res.status(500).json({ msg: "Error saving user data", error });
    }
});

// Server setup
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
