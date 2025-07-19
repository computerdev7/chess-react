import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import cors from "cors"

let app = express();
let server = createServer(app)
let io = new Server(server, {
    cors: {
    origin: "http://localhost:5173", // <-- this is the key part
    methods: ["GET", "POST"],
    credentials: true
  }
});

// app.use(cors());

app.get('/',(req,res)=> {
    res.send('success')
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })
})

server.listen(3000,()=> {
    console.log('server is running')
} )