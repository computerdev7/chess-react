import { useEffect, useState } from "react"
import useStore from "../Store.jsx";
import Alert from "./Alert.jsx";

export default function Rules({ chess, setRestartGame, board, setBoard, restartGame, move }) {

    let [alertData, setAlertData] = useState('');
    let { showAlert, setShowAlert } = useStore();

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

    useEffect(() => {

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
                setAlertData('white is checkmated')
                setShowAlert(true)
            } else {
                setAlertData('black is checkmated')
                setShowAlert(true)
            }
        } else if (isDraw) {
            setAlertData('match is draw due to insuffieint materail or due to stallement')
            setShowAlert(true)
        } else if (threeTimes) {
            setAlertData('match is draw due to three times same thing happening')
            setShowAlert(true)
        }

    },[move])


    return (
        <>
            {showAlert && <Alert username={false} gameResult={alertData} />}
        </>
    )
}