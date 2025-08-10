import { checkUser } from "./socket_utils/checkUser.js";
import { removeOffline } from "./socket_utils/removeOfflineUser.js";

export default async function SocketFunc(io) {

    let users = new Map();
    let user2 = {};
    let arr = [];
    let roomNumber = 1;
    let fenData = new Map();
    
    io.on('connection', (socket) => {

        socket.on('userid', ({ id, userName }) => {

            if (arr.length == 0) {

                if (checkUser(users, userName, id, io) == true) {
                    'same user'
                } else {
                    user2 = { userName, id, roomNumber, color: 'w' }
                    io.to(id).emit('add', { color: 'w' })
                    arr.push(user2)
                    user2 = {};
                }

            } else if (arr.length == 1) {

                if (checkUser(users, userName, id, io) == true) {
                    'same user'
                } else if (arr[0].userName == userName) {
                    arr[0].id = id;
                    io.to(id).emit('add', { color: 'w' })
                } else {
                    user2 = { userName, id, roomNumber, color: 'b' }
                    io.to(id).emit('add', { color: 'b' })
                    arr.push(user2)
                    user2 = {};
                    users.set(roomNumber, arr)
                    arr = [];
                    let data = roomNumber++;
                    let sendId = users.get(data);
                    io.to(sendId[0].id).emit('partner', true)
                    io.to(sendId[1].id).emit('partner', true)
                }

            }

        })


        socket.on('chessdata', (data) => {

            for (let [key, value] of users) {
                if (value[0].userName == data.userName) {
                    fenData.set(key,data.fenData);
                    io.to(value[1].id).emit('chessbdata', data.fenData)
                } else if (value[1].userName == data.userName) {
                    fenData.set(key,data.fenData);
                    io.to(value[0].id).emit('chessbdata', data.fenData)
                }
            }

        })

        socket.on('getFen',(data)=> {

            for (let [key,value] of users){
                if(value[0].userName == data.userName){
                    let data = fenData.get(key)
                    io.to(value[0].id).emit('fendata',data);
                } else if(value[1].userName == data.userName) {
                    let data = fenData.get(key);
                    io.to(value[1].id).emit('fendata',data);
                }
            }
        })

        socket.on('setOnline', (data) => {

            if (users.size != 0) {
                for (let [key, value] of users) {
                    if (value[0].userName == data) {
                        let date = new Date();
                        value[0] = { ...value[0], time: date.getTime() }
                    } else if (value[1].userName == data) {
                        let date = new Date();
                        value[1] = { ...value[1], time: date.getTime() }
                    }
                }
            }

        })


        socket.on('disconnect', () => {
            socket.id
        })

    })

    removeOffline(users, io, arr);
    setInterval(()=> {
        if (!io.sockets.sockets.has(arr[0]?.id)) {
            arr = [];
        }
    },10000)
}