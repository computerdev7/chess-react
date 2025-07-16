export default function Rules({chess}){

    function rules() {
    
            let isCheck = chess.inCheck()
            let isCheckMate = chess.isCheckmate()
            let isDraw = chess.isInsufficientMaterial() || chess.isStalemate() || chess.isDraw();
            let threeTimes = chess.isThreefoldRepetition()
            let turn = chess.turn()
    
            if (isCheck) {
                if (turn == 'w') {
                    console.log('white you are checked')
                } else {
                    console.log('black you are checked')
                }
            } else if (isCheckMate) {
                if (turn == 'w') {
                    alert('white you are checkmated')
                    chess.clear()
                } else {
                    alert('black you are checkmated')
                    chess.clear()
                }
            } else if (isDraw) {
                alert('match is draw due to insuffieint materail or due to stallement')
                chess.clear()
            } else if(threeTimes){
                alert('match is draw due to three times same thing happening')
                chess.clear()
            } 
        }
    
        rules();


    return 
}