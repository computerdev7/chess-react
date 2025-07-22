import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
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

let user = {}
let cond = true

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    
    socket.on('userName', (data)=> {
         
        user[data.userName] = {...user[data.userName],id : data.id}
        
    })
    
    
    socket.on('assigncolor',(data)=>  {
         
        if(data in user){
            
            if(cond && user[data]?.color == undefined){
                user[data] = {...user[data],color : 'w'}
                cond = false
            } else if(user[data]?.color == undefined) {
                user[data] = {...user[data],color : 'b'}
                cond = true 
            }
            socket.emit('userColor', user)
        }   
    }) 
    
    socket.on('userid', ({id, getItem}) => {
        
        if(getItem in user){
            user[getItem] = {...user[getItem],id : id};
        }
        
        console.log(user)
    })
    

    socket.on('chessdata', (data) => {

        for(let key in user){

            if (key != data.userName) {
                io.to(user[key].id).emit('chessbdata', data.fenData)
            } 

        }

    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})

server.listen(3000, () => {
    console.log('server is running')
})