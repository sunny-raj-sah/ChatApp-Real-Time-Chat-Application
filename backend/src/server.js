require("dotenv").config();

const http=require("http");
 
const {Server}=require("socket.io");

const app=require("./app");
const connectDB=require("./config/db")
const socketHandler=require("./socket/socketHandler");

const port=process.env.PORT||5000;


const server=http.createServer(app)

const io=new Server(server,{
    cors:{
      origin:process.env.CLIENT_URL,
      credentials:true,
    }
})


const startServer=async ()=>{
await connectDB();

socketHandler(io);

server.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
}

startServer();