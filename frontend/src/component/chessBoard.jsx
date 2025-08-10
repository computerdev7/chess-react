import { Chess } from "chess.js"
import { useState, useRef, useEffect } from "react";
import Rules from "../component/rules.jsx";
import BoardElements from "./boardElement.jsx";
import useStore from "../Store.jsx";
import SocketIo from "./socketio.jsx";
import { LuLoaderCircle } from "react-icons/lu";

export default function ChessBoard() {

    let chessRef = useRef(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'))
    let chess = chessRef.current
    let { promotionText, setPromotionText, restartGame, setRestartGame, userColor, partner } = useStore();
    let [board, setBoard] = useState(chess.board().reverse());
    let [move, setMove] = useState({
        from: null,
        to: null,
        promotion: null
    })
    let seeTurn = chess.turn();
    let getItem = sessionStorage.getItem('userName')
    let condForPlay = sessionStorage.getItem('condForPlay')

    console.log(move, seeTurn, userColor, getItem)

    return (
        <>
            {condForPlay == 'true' && <SocketIo chess={chess} setBoard={setBoard} />}
            <Rules chess={chess} setRestartGame={setRestartGame} board={board} restartGame={restartGame} setBoard={setBoard} move={move} />
            {condForPlay == 'true' ?
                (partner ?
                    <div className="h-screen w-screen flex justify-center items-center">
                        <div className="h-28 w-44 absolute right-4 top-4 bg-slate-500 flex justify-center items-center flex-col rounded-md">
                            <p>Turn : {seeTurn} </p>
                            <input className="w-2/3"
                                type="string" value={promotionText} onChange={(e) => setPromotionText(e.currentTarget.value)} />
                        </div>
                        <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:w-[550px] lg:h-[550px] bg-amber-300 grid grid-cols-8"
                        >
                            <BoardElements board={board} move={move} chess={chess} setMove={setMove} setBoard={setBoard} />
                        </div>
                    </div>
                    : 
                    <div className="h-screen w-screen flex justify-center gap-5 items-center bg-black/90">
                        <LuLoaderCircle  className="text-2xl text-white/30 animate-spin"/>
                        <h1 className=" text-white/30 hover:text-white/100">Waiting for the other player</h1>
                    </div>
                ) :
                <div className="h-screen w-screen flex justify-center items-center">
                    <div className="h-28 w-44 absolute right-4 top-4 bg-slate-500 flex justify-center items-center flex-col rounded-md">
                        <p>Turn : {seeTurn} </p>
                        <input className="w-2/3"
                            type="string" value={promotionText} onChange={(e) => setPromotionText(e.currentTarget.value)} />
                    </div>
                    <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:w-[550px] lg:h-[550px] bg-amber-300 grid grid-cols-8"
                    >
                        <BoardElements board={board} move={move} chess={chess} setMove={setMove} setBoard={setBoard} />
                    </div>
                </div>
            }
        </>
    )
}