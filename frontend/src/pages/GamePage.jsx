import { useEffect } from "react"
import ChessBoard from "../component/chessBoard"
import { useLocation, useNavigate } from "react-router"

export default function GamePage(){

    let location = useLocation()
    let condForPlay = location.state
    let getItem = sessionStorage.getItem('userName')
    let navigate = useNavigate()

     useEffect(() => {

        if (getItem == null) {
            console.log(getItem)
            navigate('/login')
        }
        
    }, [])

    return (
        <ChessBoard condForPlay={condForPlay}/>
    )
}