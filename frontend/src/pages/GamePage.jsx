import { useEffect } from "react"
import ChessBoard from "../component/chessBoard"
import { useNavigate } from "react-router"

export default function GamePage(){

    let getItem = sessionStorage.getItem('userName')
    let navigate = useNavigate()

     useEffect(() => {

        if (getItem == null) {
            navigate('/')
        }
        
    }, [])

    return (
        <>
        <ChessBoard/>
        </>
    )
}