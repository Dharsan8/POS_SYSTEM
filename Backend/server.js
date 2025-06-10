require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");
const path = require('path');
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth",authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);



const PORT =  3000;
app.listen(PORT,()=>console.log(`Server is connected ${PORT}`));