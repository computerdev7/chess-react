import { useEffect } from "react"
import socket from "../utils/setUpSocketio.js"
import useStore from "../Store.jsx"

export default function SocketIo({ chess, setBoard }) {

    let getItem = sessionStorage.getItem('userName');
    let { setUserColor, setPartner } = useStore();
    
    useEffect(() => {
        
        socket.on('connect', () => {
            let id = socket.id
            socket.emit('userid', { id, userName: getItem })
            socket.emit('getFen', { id, userName: getItem })
        })

         socket.on('chessbdata', (data) => {

            chess.load(data)

            setBoard(chess.board().reverse());

        })

         socket.on('add', (data) => {

            setUserColor(data.color)
 
        })

        let id = socket.id;

        socket.emit('userid', { id, userName: getItem })

        let interval = setInterval(()=> {

            socket.emit('setOnline',getItem)

        },5000)

        socket.on('partner',()=> {

            setPartner(true)

        })

        socket.on('nopartner',()=> {

            chess.reset();
            setBoard(chess.board().reverse());
            setPartner(false);

            setTimeout(()=> {
                window.location.reload();
            },100)

        })

        socket.on('fendata', (data)=> {

            chess.load(data)

            setBoard(chess.board().reverse());

        })

        return () => {
            socket.disconnect();
            clearInterval(interval)
        };

    }, [])


    return (
        <>
        </>
    )
}