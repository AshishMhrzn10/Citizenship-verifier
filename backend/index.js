const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection successful"))
    .catch(err => console.log(err));

//Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: ""
    }
});

const userInfoSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    permanentAddress: String,
    temporaryAddress: String,
    birthDate: String,
    fathersName: String,
    mothersName: String,
    citizenshipNo: String,
    issueDate: String,
    issueAt: String,
    image: String,
    status: {
        type: String,
        default: "pending"
    }
});
const User = new mongoose.model("User", userSchema);
const UserInfo = new mongoose.model("UserInfo", userInfoSchema);


app.use(express.json());
app.use(cors());
//Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        !user && res.send({ message: "User not registered!" });

        if (user.password === password) {
            res.status(200).send({ message: "Login Successful", user: user });
        } else {
            res.send({ message: "Wrong password or username!" });
        }
    } catch (err) {
        res.send({ message: "User not found" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            res.send({ message: "Username already exists!" });
        }
        else {
            const newUser = new User({
                name,
                email,
                password
            });
            const user = await newUser.save();
            res.send({ message: "User successfully created." });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/submitInfo", async (req, res) => {
    const { name, email, gender, permanentAddress, temporaryAddress, birthDate, fathersName, mothersName, citizenshipNo, issueDate, issueAt, image } = req.body;
    try {
        // const oldUser = await User.findOne({ email: email });
        // oldUser && res.send({ message: "You have already submitted your request. Please wait for it to be verified" });

        const newUserInfo = new UserInfo({
            name, email, gender, permanentAddress, temporaryAddress, birthDate, fathersName, mothersName, citizenshipNo, issueDate, issueAt, image
        });
        const userInfo = await newUserInfo.save();

        //enable status of user 
        const userStatus = await User.findOne({ email: email });
        userStatus.status = "pending";
        userStatus.save();
        res.send({ message: "UserInfo successfully saved." });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await UserInfo.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/post/:id/:email", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await UserInfo.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/verify/:id/:email", async (req, res) => {
    const { id, email } = req.params;
    try {
        const post = await UserInfo.findById(id);
        post.status = "verified";
        post.save();

        const userStatus = await User.findOne({ email: email });
        userStatus.status = "verified";
        userStatus.save();
        res.send({ message: "Verified successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/cancel/:id/:email", async (req, res) => {
    const { id, email } = req.params;
    try {
        await UserInfo.findByIdAndRemove(id);

        const userStatus = await User.findOne({ email: email });
        userStatus.status = "";
        userStatus.save();
        res.send({ message: "Cancelled successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(8800, () => {
    console.log("Backend server is running");
});