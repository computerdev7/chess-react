import { CreateChessBoardF } from "../utils/createChessBoard.jsx";
import useStore from "../Store.jsx";
import { useEffect } from "react";
import socket from "../utils/setUpSocketio.jsx";

export default function BoardElements({ board, move, chess, setMove, setBoard, condForPlay }) {

    let { fromState, userColor } = useStore();
    let createChessBoard = CreateChessBoardF(board, setMove, chess, move)

    console.log(userColor)

    useEffect(() => {

        if (move.from != null && move.to != null) {

            try {

                chess.move(move);

                setMove({
                    from: null,
                    to: null,
                    promotion: null
                })

 
                if (condForPlay == 'false') {

                    let fenData = chess.fen();
                    let userName = sessionStorage.getItem('userName')

                    socket.emit('chessdata', { userName, fenData });
                }

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