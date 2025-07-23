export default function SocketFunc(io) {

    let users = new Map()
    let user2 = {}
    let arr = []
    let roomNumber = 1;


    io.on('connection', (socket) => {

        console.log('server side socket running')
        console.log('user connected', socket.id);

        socket.on('userid', ({ id, userName }) => {

            function checkUser(map, userName) {
                for (let [key, value] of map) {
                    if (value[0].userName == userName || value[1].userName == userName) {
                        return true;
                    }
                }
            }


            if (arr.length == 0) { 

                if (checkUser(users, userName) == true) {
                    console.log('same user')
                } else {

                    user2 = { userName, id, roomNumber, color: 'w' }
                    io.to(id).emit('add', { roomNumber, color: 'w' })
                    arr.push(user2)
                    user2 = {}; 
                }

            } else if (arr.length == 1) {

                if (checkUser(users, userName) == true) {  
                    console.log('same user') 
                } else if (arr[0].userName == userName) {
                    console.log('same oppoenet')
                } else {

                    user2 = { userName, id, roomNumber, color: 'b' }
                    io.to(id).emit('add', { roomNumber, color: 'b' })
                    arr.push(user2)
                    user2 = {};
                    users.set(roomNumber, arr)
                    arr = [];
                    roomNumber++;

                }

            }

            console.log(users)

        })



        socket.on('chessdata', (data) => {

            for (let [key, value] of users) { 
                if (value[0].userName == data.userName) {
                    io.to(value[1].id).emit('chessbdata', data.fenData)
                } else if (value[1].userName == data.userName) {
                    io.to(value[0].id).emit('chessbdata', data.fenData)
                }
            }

        })

        socket.on('disconnect', () => { 
            console.log('user disconnected', socket.id)
        })
    })
}