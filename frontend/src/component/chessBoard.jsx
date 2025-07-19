import { Chess } from "chess.js"
import { useEffect, useState, useRef } from "react";
import Rules from "../component/rules.jsx";
import BoardElements from "./boardElement.jsx";
import { undoMove } from "../utils/undoMove.js";
import useStore from "../Store.jsx";

export default function ChessBoard() {

    let chessRef = useRef(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'))
    let chess = chessRef.current
    let { timer, setTimer, fromState, showPromotionInput,
        promotionText, setPromotionText } = useStore();
    let [board, setBoard] = useState(chess.board().reverse());
    let [move, setMove] = useState({
        from: null,
        to: null,
        promotion: null
    })
    let seeTurn = chess.turn();

    console.log(move, seeTurn)

    useEffect(() => {

        if (move.from != null && move.to != null) {

            try {

                chess.move(move);
                setTimer(true)

                setTimeout(() => {
                    setTimer(false)
                }, 10000)

                setMove({
                    from: null,
                    to: null,
                    promotion: null
                })
                setBoard(chess.board().reverse())
            } catch (err) {
                setMove({
                    from: null,
                    to: null,
                    promotion: null
                })
                console.log(err)
            }
        }

    }, [fromState])
    
    return (
        <>
            <Rules chess={chess} />
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="h-28 w-44 absolute right-4 top-4 bg-slate-500"
                >
                    <p>Turn : {seeTurn} </p>
                    {timer &&
                        <button className="border"
                            onClick={() => {
                                undoMove(chess, setTimer, setBoard)
                            }}> UNDO
                        </button>}
                    {showPromotionInput &&
                        <input type="string" value={promotionText} onChange={(e) => setPromotionText(e.currentTarget.value)} />
                    }
                </div>
                <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:w-[550px] lg:h-[550px] bg-amber-300 grid grid-cols-8"
                >
                    <BoardElements board={board} move={move} chess={chess} setMove={setMove} />
                </div>
            </div>
        </>
    )
}