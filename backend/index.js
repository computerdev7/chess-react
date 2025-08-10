import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import SocketFunc from "./socket_connection/socketconnection.js"

let app = express();
app.use(express.json());
app.use(cors({
    origin: "https://warm-torrone-9ccbff.netlify.app",
    methods: ["GET", "POST", "OPTIONS"] ,
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
let server = createServer(app)
let io = new Server(server, {
    cors: {
        origin: "https://warm-torrone-9ccbff.netlify.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});


let userList = new Map();

app.post('/setUser', (req, res) => {
    let userName = req.body.userName
    try {
        let findUser = userList.get(userName)
        if (!findUser) {
            userList.set(userName, userName)
            res.status(201).json({ message: 'user is created' })
        } else {
            res.status(400).json({ message: 'username already exist' })
        }
    } catch (err) {
        console.log(err)
    } 
})

SocketFunc(io);

server.listen(3000, () => {
    console.log('server is running')
})