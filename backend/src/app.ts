import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import adminRoutes from "./routes/adminRoutes";
import announcementRoutes from "./routes/announcementRoutes";


const app: Application = express();


app.use(
  cors({
    origin: [
      "https://campus-connect-8nes.vercel.app/",
    ],

    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());


// routes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/announcements", announcementRoutes);



app.get("/",(req:Request,res:Response)=>{
    res.send("API running");
});



// error handler
app.use(
(err:any,req:Request,res:Response,next:NextFunction)=>{

    console.log(err);

    res.status(500).json({
        message:err.message
    });

});


export default app;