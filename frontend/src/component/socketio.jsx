import { useEffect } from "react"
import socket from "../utils/setUpSocketio.js"
import useStore from "../Store.jsx"

export default function SocketIo({ chess, setBoard }) {

    let getItem = sessionStorage.getItem('userName')
    let { setUserColor } = useStore()
    
    useEffect(() => {

            console.log('socket running')

        socket.on('connect', () => {

            console.log('socket running in useEffect')

            let id = socket.id

            console.log(id)

            socket.emit('userid', { id, userName : getItem })

            socket.on('chessbdata', (data) => {

                chess.load(data)

                setBoard(chess.board().reverse());

            })

            socket.on('add', (data)=> {

                setUserColor(data.color)

            })


        })

        return () => {
            socket.disconnect();
        };

    }, [])


    return (
        <>
        </>
    )
}