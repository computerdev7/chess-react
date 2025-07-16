import {
    TbChessRookFilled, TbChessRook, TbChessQueenFilled, TbChessQueen, TbChessKnightFilled,
    TbChessKnight, TbChessKingFilled, TbChessKing, TbChessFilled, TbChess, TbChessBishopFilled, TbChessBishop
} from "react-icons/tb";
import attacker from "../utils/attacker.js";
import { useEffect, useState } from "react";
import nextPlayable from "../utils/playable.js";

export default function BoardElements({ updateMove, board, move, chess }) {

    let [viewAttacker,setViewAttacker] = useState([])
    let [viewPlay,setViewPlay] = useState([])
    let seeTurn = chess.turn();
    let getPiece = chess.get(move?.from)

    let createChessArrayElements = () => {

        let arr = [];

        for (let i = 8; i >= 1; i--) {
            for (let j = 0; j < 8; j++) {
                arr.push({ place: String.fromCharCode(97 + j) + i, r: j, c: i, isWhite: (i + j) % 2 === 0 })
            }
        }

        return arr;
    }

    useEffect(()=> {

        if(move.from != undefined && getPiece.color == seeTurn){
            setViewAttacker(attacker(move, chess))
            setViewPlay(nextPlayable(move, chess))
        } else {
            setViewAttacker([])
            setViewPlay([])
        }

    },[move])


    let chessArrayElements = createChessArrayElements();

    function createChessBoardF(chessArray) {

        let el = chessArray.map((e, i) => {

            let setBlockPieceVar = board[e.c - 1][e.r]

            function getRightPiece() {

                if (setBlockPieceVar == null) {
                    return ''
                } else if (setBlockPieceVar.type === 'p' && setBlockPieceVar.color === 'b') {
                    return <TbChessFilled />
                } else if (setBlockPieceVar.type === 'p' && setBlockPieceVar.color === 'w') {
                    return <TbChess />
                } else if (setBlockPieceVar.type === 'r' && setBlockPieceVar.color === 'b') {
                    return <TbChessRookFilled />
                } else if (setBlockPieceVar.type === 'r' && setBlockPieceVar.color === 'w') {
                    return <TbChessRook />
                } else if (setBlockPieceVar.type === 'n' && setBlockPieceVar.color === 'b') {
                    return <TbChessKnightFilled />
                } else if (setBlockPieceVar.type === 'n' && setBlockPieceVar.color === 'w') {
                    return <TbChessKnight />
                } else if (setBlockPieceVar.type === 'q' && setBlockPieceVar.color === 'b') {
                    return <TbChessQueenFilled />
                } else if (setBlockPieceVar.type === 'q' && setBlockPieceVar.color === 'w') {
                    return <TbChessQueen />
                } else if (setBlockPieceVar.type === 'k' && setBlockPieceVar.color === 'b') {
                    return <TbChessKingFilled />
                } else if (setBlockPieceVar.type === 'k' && setBlockPieceVar.color === 'w') {
                    return <TbChessKing />
                } else if (setBlockPieceVar.type === 'b' && setBlockPieceVar.color === 'b') {
                    return <TbChessBishopFilled />
                } else if (setBlockPieceVar.type === 'b' && setBlockPieceVar.color === 'w') {
                    return <TbChessBishop />
                }
            }

            let setRightPiece = getRightPiece()
            let findAttacker = viewAttacker.find(en => en == e.place)
            let findPlay = viewPlay.find(en => en == e.place)
            let css;

            if(e.isWhite){
                if(findAttacker != undefined && findPlay != undefined) {
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-red-300"
                }
                else if(findAttacker){
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-orange-300"
                } else if(findPlay){
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-green-300"
                } else {
                    css = "aspect-square w-full h-full border flex items-center justify-center bg-white text-black"
                }
            } else {
                if(findAttacker != undefined && findPlay != undefined) {
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-red-300"
                }
                else if(findAttacker){
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-orange-300"
                } else if(findPlay){
                    css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-green-300"
                } else {
                    css = "aspect-square w-full h-full border flex items-center justify-center bg-black text-white"
                }
            }

            // <div className="border"></div>

                return (<div className={css}
                    onClick={() => {
                        updateMove(e.place, e.isWhite)
                    }}
                >
                    <p className="text-3xl"> {setRightPiece} </p> </div>)
            
        })

        return el;

    }

    let createChessBoard = createChessBoardF(chessArrayElements)

    return (
        <>
            {createChessBoard}
        </>
    )
}