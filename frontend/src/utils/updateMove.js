export function updateMove(val,chess,move,setMove, fromState, setFromState, setShowPromotionInput, promotionText) {

    let findPiece = chess.get(val);
    let compPiece = chess.get(move?.from);
    let getPieceMoves = chess.moves({ square: move?.from });
    let seeTurn = chess.turn()

    if(move?.from == null && findPiece?.color != seeTurn){
        return 
    }

    getPieceMoves.map((el) => {

        if (el.includes('=')) {
            if (findPiece != undefined && fromState) {
                setShowPromotionInput(true)
                setMove((e) => ({ ...e, from: val, promotion: promotionText }))
                setFromState()
            } else if (fromState == false) {
                setShowPromotionInput(false)
                setMove((e) => ({ ...e, to: val }))
                setFromState()
            }
            return
        }

    })


    if (findPiece?.color == compPiece?.color && findPiece != undefined && compPiece != undefined) {
        setMove((e) => ({ ...e, from: val }))
        return
    }

    if (findPiece != undefined && fromState) {
        setMove((e) => ({ ...e, from: val }))
        setFromState()
    } else if (fromState == false) {
        setMove((e) => ({ ...e, to: val }))
        setFromState()
    }
}