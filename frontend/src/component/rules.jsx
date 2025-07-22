import { useEffect } from "react"

export default function Rules({ chess, setRestartGame, board, setBoard, restartGame }) {

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

    function rules() {

        let isCheck = chess.inCheck()
        let isCheckMate = chess.isCheckmate()
        let isDraw = chess.isInsufficientMaterial() || chess.isStalemate() || chess.isDraw();
        let threeTimes = chess.isThreefoldRepetition()
        let turn = chess.turn()

        if (isCheck && isCheckMate == false) {
            if (turn == 'w') {
                console.log('white you are checked')
            } else {
                console.log('black you are checked')
            }
        } else if (isCheckMate) {
            if (turn == 'w') {
                console.log('white you are checkmated')
                setRestartGame(true)

            } else {
                console.log('black you are checkmated')
                setRestartGame(true)
            }
        } else if (isDraw) {
            console.log('match is draw due to insuffieint materail or due to stallement')
            setRestartGame(true)
        } else if (threeTimes) {
            console.log('match is draw due to three times same thing happening')
            setRestartGame(true)

        }
    }

    rules();

    return
}