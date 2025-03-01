require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is connected ${PORT}`));