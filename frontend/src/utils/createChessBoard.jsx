import { getRightPiece } from "./getRightPiece.jsx"
import { updateMove } from "./updateMove.js";
import useStore from "../Store.jsx";


let createChessArrayElements = () => {

    let arr = [];

    for (let i = 8; i >= 1; i--) {
        for (let j = 0; j < 8; j++) {
            arr.push({ place: String.fromCharCode(97 + j) + i, r: j, c: i, isWhite: (i + j) % 2 === 0 })
        }
    }

    return arr;
}


let chessArrayElements = createChessArrayElements();


export function CreateChessBoardF(board, setMove, chess, move) {

    let { fromState, setFromState, promotionText, userColor, condForPlay } = useStore();

    let el = chessArrayElements.map((e, i) => {

        let boardPiece = board[e.c - 1][e.r]
        let setRightPiece = getRightPiece(boardPiece)
        let css;

        if (e.isWhite) {

            css = "aspect-square w-full h-full border flex items-center justify-center bg-white text-black"

        } else {

            css = "aspect-square w-full h-full border flex items-center justify-center bg-black text-white"

        }

        return (
            <div className={css} key={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={async () => {
                    updateMove(e.place, chess, move, setMove, fromState, setFromState, promotionText, userColor, condForPlay)
                }}
                onClick={() => {
                    updateMove(e.place, chess, move, setMove, fromState, setFromState, promotionText, userColor, condForPlay)
                }}
            >
                <p draggable
                    onDragStart={() => {
                        updateMove(e.place, chess, move, setMove, fromState, setFromState, promotionText, userColor, condForPlay)
                    }}
                    className="text-3xl w-fit h-fit"> {setRightPiece} </p> </div>)
    })

    return el;

}