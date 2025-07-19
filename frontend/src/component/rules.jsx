export default function Rules({chess, setBoard}){

    function rules() {
    
            let isCheck = chess.inCheck()
            let isCheckMate = chess.isCheckmate()
            let isDraw = chess.isInsufficientMaterial() || chess.isStalemate() || chess.isDraw();
            let threeTimes = chess.isThreefoldRepetition()
            let turn = chess.turn()
        
            console.log(isCheckMate,isCheck)

            if (isCheck && isCheckMate == false) {
                if (turn == 'w') {
                    console.log('white you are checked')
                } else {
                    console.log('black you are checked')
                }
            } else if (isCheckMate) {
                if (turn == 'w') {
                    console.log('white you are checkmated')
                    chess.clear()
                    setBoard(chess.board().reverse())
                } else {
                    console.log('black you are checkmated')
                    chess.clear()
                    setBoard(chess.board().reverse())
                }
            } else if (isDraw) {
                console.log('match is draw due to insuffieint materail or due to stallement')
                chess.clear()
                setBoard(chess.board().reverse())
            } else if(threeTimes){
                console.log('match is draw due to three times same thing happening')
                chess.clear()
                setBoard(chess.board().reverse())
            } 
        }
    
        rules();


    return 
}