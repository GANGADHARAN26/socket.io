require("dotenv").config();
const express=require("express");
const db=require("./db/connect")
const authRoutes=require("./routes/auth.routes")
db();
const port=process.env.PORT || 5000
const app = express();
const http = require("http");
const cors=require("cors");1
const server=http.createServer(app);
const {Server}=require("socket.io")

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173", 
        method:["GET","POST"],
    }
})
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use(express.json())  //midddlware to parse req into json



app.get("/",(req,res)=>{
    res.status(200).send({message:"Hello"})
})


app.use("/api",authRoutes)


io.on("connection",(socket)=>{ 
  socket.on("join-room",(data)=>{
    socket.join(data)
    console.log(`User ${socket.id} has joined in  the room`);
  });
  socket.on("send-message",(data)=>{
    socket.to(data.room).emit("receive-message",data)
  })
  socket.on("disconnect",()=>{
    console.log("Disconnected.",socket.id)
  })
})
server.listen(port,()=>{
    console.log("App is running on port "+port);
})