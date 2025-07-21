import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import cors from "cors"

let app = express();
let server = createServer(app)
let io = new Server(server, {
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('disconnect', ()=> {
        console.log('user disconnected', socket.id)
    })
})

server.listen(3000,()=> {
    console.log('server is running')
} )