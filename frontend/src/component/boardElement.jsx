import { CreateChessBoardF } from "../utils/createChessBoard.jsx";
import useStore from "../Store.jsx";
import { useEffect } from "react";

export default function BoardElements({ board, move, chess, setMove, setBoard}) {
    
    let {fromState} = useStore();
    let createChessBoard = CreateChessBoardF(board, setMove, chess, move)

    useEffect(() => {

        if (move.from != null && move.to != null) {

            try {

                chess.move(move);
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
            {createChessBoard}
        </>
    )
}