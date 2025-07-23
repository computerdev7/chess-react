import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import SocketFunc from "./socketconnection.js"

let app = express();
let server = createServer(app)
let io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

SocketFunc(io);

server.listen(3000, () => {
    console.log('server is running')
})