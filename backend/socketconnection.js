export default function SocketFunc(io) {

    let users = new Map()
    let user2 = {}
    let arr = []
    let roomNumber = 1;


    io.on('connection', (socket) => {

        console.log('user connected', socket.id);
 
        socket.on('userid', ({ id, userName }) => {
               
            function checkUser(map, userName) { 

                for (let [key, value] of map) {  

                    if (value[0].userName == userName) {

                        value[0] = { ...value[0], id: id };
                        io.to(id).emit('add', { color: 'w' })
                        map.set(key, value)
                        io.to(value[0].id).emit('partner', true)
                        return true;

                    } else if (value[1].userName == userName) {

                        value[1] = { ...value[1], id: id };
                        io.to(id).emit('add', { color: 'b' })
                        map.set(key, value)
                        io.to(value[1].id).emit('partner', true)
                        return true;

                    }

                }   
            }


            if (arr.length == 0) {

                if (checkUser(users, userName) == true) {
                    console.log('same user')
                } else {
                    user2 = { userName, id, roomNumber, color: 'w' }
                    io.to(id).emit('add', { color: 'w' })
                    arr.push(user2)
                    user2 = {};
                }

            } else if (arr.length == 1) {

                if (checkUser(users, userName) == true) {
                    console.log('same user')
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

        socket.on('setOnline',(data)=> {

            if(users.size != 0){   
                for (let [key, value] of users) {
                    if (value[0].userName == data) {
                        let date = new Date();
                        value[0] = {...value[0],time : date.getTime()}
                    } else if (value[1].userName == data) { 
                        let date = new Date();
                         value[1] = {...value[1],time : date.getTime()} 
                    }
                }
            }

        })
       
        
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)

        })

    })

    setInterval(()=> { 

        if(users.size != 0) {  
            for(let [key, value] of users) {

                let date = new Date() 

                if(date - value[0]?.time > 10000){
                    io.to(value[1].id).emit('nopartner', true)
                    users.delete(key)
                } else if (date - value[1]?.time > 10000) { 
                    io.to(value[0].id).emit('nopartner', true)
                    users.delete(key)
                } else if (value[0]?.time == undefined){
                    value[0].time = date.getTime()
                } else if (value[1]?.time == undefined) {
                    value[1].time = date.getTime()
                }

            }   
        }

        if(!io.sockets.sockets.has(arr[0]?.id)){
            arr = [];  
        }
        
        console.log(users)
 
    },10000)   
}