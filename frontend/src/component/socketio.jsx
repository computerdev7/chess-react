import { useEffect } from "react"
import socket from "../utils/setUpSocketio"

export default function SocketIo(){

    useEffect(()=> {

        socket.on('connect', ()=> {
            console.log('user conected in frontend')
        })

        return () => {
            socket.disconnect();
        };
    },[])

    return (
        <>
        </>
    )
}