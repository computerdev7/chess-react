import { Chess } from "chess.js"
import { useState, useRef, useEffect } from "react";
import Rules from "../component/rules.jsx";
import BoardElements from "./boardElement.jsx";
import useStore from "../Store.jsx";

export default function ChessBoard() {

    let chessRef = useRef(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'))
    let chess = chessRef.current
    let { promotionText, setPromotionText } = useStore();
    let [board, setBoard] = useState(chess.board().reverse());
    let [move, setMove] = useState({
        from: null,
        to: null,
        promotion: null
    })
    let [restartGame, setRestartGame] = useState(false);
    let seeTurn = chess.turn();

    console.log(move, seeTurn)

    useEffect(() => {

        if (restartGame == true) {
            chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1')
            setBoard(chess.board().reverse())
        }

    }, [restartGame])

    useEffect(() => {

        if (restartGame == true) {
            setRestartGame(false)
        }

    }, [board])


    return (
        <>
            <Rules chess={chess} setRestartGame={setRestartGame} />
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
        </>
    )
}