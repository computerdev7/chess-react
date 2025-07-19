import attacker from "../utils/attacker.js";
import nextPlayable from "../utils/playable.js";
import { useEffect, useState } from "react";
import { CreateChessBoardF } from "../utils/createChessBoard.jsx";
import useStore from "../Store.jsx";

export default function BoardElements({ board, move, chess, setMove }) {

    let [viewAttacker, setViewAttacker] = useState([])
    let [viewPlay, setViewPlay] = useState([])
    let seeTurn = chess.turn();
    let getPiece = chess.get(move?.from)
    let {fromState} = useStore();

    useEffect(() => {

        if (move.from != undefined && getPiece.color == seeTurn) {
            setViewAttacker(attacker(move, chess))
            setViewPlay(nextPlayable(move, chess))
        } else {
            setViewAttacker([])
            setViewPlay([])
        }

    }, [move]) 
    
    let createChessBoard = CreateChessBoardF(board, viewAttacker, viewPlay, setMove, chess, move)

    return (
        <>
            {createChessBoard}
        </>
    )
}