import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js';
import experienceRoutes from './routes/experienceRoutes.js'
import commentRoutes from './routes/commentRoutes.js';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api",authRoutes);
app.use("/api/experience",experienceRoutes);
app.use('/api',commentRoutes);
app.get("/",(req,res)=>{
    res.send("hello");
});

 
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    }); 
}).catch((err)=>{
    console.log("error occurred connecting to mongoDB",err);
}) 