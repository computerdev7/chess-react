import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import SocketFunc from "./socket_connection/socketconnection.js"
import connectToDb from "./database/connectDatabase.js"
import route from "./controllers/authController.js"

let app = express();
app.use(express.json());
app.use(cors({
    origin: "https://online-chessgame.netlify.app",
    methods: ["GET", "POST", "OPTIONS"] ,
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
let server = createServer(app)
let io = new Server(server, {
    cors: {
        origin: "https://online-chessgame.netlify.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use('/user', route);

let userList = new Map();

app.post('/setUser', (req, res) => {
    let userName = req.body.userName
    try {
        let findUser = userList.get(userName)
        if (!findUser) {
            userList.set(userName, userName)
            res.status(201).json({ message: 'user is created DHAMAKA' })
        } else {
            res.status(400).json({ message: 'username already exist' })
        }
    } catch (err) {
        console.log(err)
    } 
})

SocketFunc(io);

server.listen(3000, async() => {
    await connectToDb();
    console.log('server is running')
})
