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


export function CreateChessBoardF( board, viewAttacker, viewPlay, setMove, chess, move) {

    let { fromState, setFromState, setShowPromotionInput, promotionText } = useStore();

    let el = chessArrayElements.map((e) => {

        let boardPiece = board[e.c - 1][e.r]
        let setRightPiece = getRightPiece(boardPiece)
        let findAttacker = viewAttacker.find(en => en == e.place)
        let findPlay = viewPlay.find(en => en == e.place)
        let css;

        if (e.isWhite) {
            if (findAttacker != undefined && findPlay != undefined) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-orange-300"
            }
            else if (findAttacker) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-red-300"
            } else if (findPlay) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-white text-black border-green-300"
            } else {
                css = "aspect-square w-full h-full border flex items-center justify-center bg-white text-black"
            }
        } else {
            if (findAttacker != undefined && findPlay != undefined) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-orange-300"
            }
            else if (findAttacker) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-red-300"
            } else if (findPlay) {
                css = "aspect-square w-full h-full border-4 flex items-center justify-center bg-black text-white border-green-300"
            } else {
                css = "aspect-square w-full h-full border flex items-center justify-center bg-black text-white"
            }
        }

        return (
            <div className={css}
                onDragOver={(e) => e.preventDefault()}
                onDrop={async () => {
                    updateMove(e.place, chess, move, setMove, fromState, setFromState)
                }}
                onClick={() => {
                    updateMove(e.place, chess, move, setMove, fromState, setFromState, setShowPromotionInput, promotionText)
                }}
            >
                <p draggable
                    onDragStart={() => {
                        updateMove(e.place, chess, move, setMove, fromState, setFromState, setShowPromotionInput, promotionText)
                    }}
                    className="text-3xl w-fit h-fit"> {setRightPiece} </p> </div>)
    })

    return el;

}