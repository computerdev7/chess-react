import ChessBoard from "../component/chessBoard"
import { useLocation } from "react-router"

export default function GamePage(){

    let location = useLocation()

    let condForPlay = location.state

    return (
        <ChessBoard condForPlay={condForPlay}/>
    )
}