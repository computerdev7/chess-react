import { useEffect, useState } from "react"
import useStore from "../Store.jsx";
import Alert from "./Alert.jsx";
import axios from "axios";

export default function Rules({ chess, setRestartGame, board, setBoard, restartGame, move, userColor }) {

    let [alertData, setAlertData] = useState('');
    let { showAlert, setShowAlert } = useStore();
    let username1 = sessionStorage.getItem("username")

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

    function updateProfile (username,result){
        axios.put('https://chess-react-8rwz.onrender.com/userprofile/update', {username,result})
        .then(res=> console.log('successfully updated'))
        .catch(err=> console.log(err))
    }

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
                if(userColor == 'b'){
                    updateProfile(username1, 'win')
                } 
                if(userColor == 'w'){
                    updateProfile(username1, 'loss')
                }
                setAlertData('white is checkmated')
                setShowAlert(true)
            } else {
                if(userColor == 'w'){
                    updateProfile(username1, 'win')
                } 
                if(userColor == 'b'){
                    console.log('loss')
                    updateProfile(username1, 'loss')
                }
                setAlertData('black is checkmated')
                setShowAlert(true)
            }
        } else if (isDraw) {
            updateProfile(username1, 'draw')
            setAlertData('match is draw due to insuffieint materail or due to stallement')
            setShowAlert(true)
        } else if (threeTimes) {
            updateProfile(username1, 'draw')
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