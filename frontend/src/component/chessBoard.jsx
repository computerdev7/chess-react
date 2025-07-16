import { Chess } from "chess.js"
import { useEffect, useState, useRef } from "react";
import Rules from "../component/rules.jsx";
import BoardElements from "./boardElement.jsx";

export default function ChessBoard() {

    let chessRef = useRef(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'))
    let chess = chessRef.current
    let [board, setBoard] = useState(chess.board().reverse());
    let [move, setMove] = useState({
        from: null,
        to: null
    })
    let [fromState, setFromState] = useState(true)
    let seeTurn = chess.turn()

    console.log(move,seeTurn)

    useEffect(() => {

        if (move.from != null && move.to != null) {
            try {

                chess.move(move);
                setMove({
                    from: null,
                    to: null
                })
                setBoard(chess.board().reverse())
            } catch (err) {
                setMove({
                    from : null,
                    to : null
                })
                console.log(err)
            }
        }
    }, [fromState])


    function updateMove(val,col) {

        let findPiece = chess.get(val)
        let compPiece = chess.get(move?.from)

        if(findPiece?.color == compPiece?.color && findPiece != undefined && compPiece != undefined){
            setMove((e)=> ({...e, from : val}))
            return 
        }
        
        if (findPiece != undefined && fromState) {

            setMove((e) => ({ ...e, from: val }))
            setFromState(e => !e)

        } else if(fromState == false){

            setMove((e) => ({ ...e, to: val }))
            setFromState(e => !e)

        }

    }

    return (
        <>
        <Rules chess={chess}/>
            <div className="h-screen w-screen flex justify-center items-center ">
                <div className="h-[600px] w-[600px] bg-amber-300 grid grid-cols-8"
                >
                    <BoardElements updateMove={updateMove} board={board} move={move} chess={chess}/>
                </div>
            </div>
        </>
    )
}