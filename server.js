import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({
        name:"TNet AI",
        status:"Running"
    });
});


app.post("/api/scan",(req,res)=>{
    
    res.json({
        success:true,
        message:"Scan endpoint ready"
    });

});


app.listen(3000,()=>{
    console.log("TNet server running");
});
