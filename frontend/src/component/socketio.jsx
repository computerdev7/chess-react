import { useEffect } from "react"
import socket from "../utils/setUpSocketio"
import useStore from "../Store.jsx"

export default function SocketIo({ chess, setBoard }) {

    let getItem = sessionStorage.getItem('userName')
    let { setUserColor } = useStore()

    useEffect(() => {

        socket.on('connect', () => {

            let id = socket.id

            console.log(id)

            socket.emit('userid', { id, getItem })
            socket.emit('userName', { userName: getItem, id }); //remove it afterwards
            socket.emit('assigncolor', getItem)

            socket.on('chessbdata', (data) => {

                chess.load(data)
                
                setBoard(chess.board().reverse());

            })

            socket.on('userColor', (data) => {


                setUserColor(data[getItem].color)


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