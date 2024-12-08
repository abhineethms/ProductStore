
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const port=process.env.PORT||5000;


const app =express();


const __dirname=path.resolve();
app.use(express.json());//allows us to accept json data in the body

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV==="production"){
     app.use(express.static(path.join(__dirname,"/frontend/dist")));

     app.get("*",(req,res)=>{
          res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
     })
}

app.listen(port, ()=>{
     connectDB();
     console.log("Server has started at port 5000 ");
});