require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const tutorRoutes = require("./routes/tutorRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const blogPostRoutes = require("./routes/blogPostRoutes.js")

const http = require("http").Server(app);


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4000"
    }
});





// Connect to database
connectDB();


// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/tutor", tutorRoutes);
app.use("/api", authRoutes);
app.use("/api/user", userRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/blogpost", blogPostRoutes);;

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});