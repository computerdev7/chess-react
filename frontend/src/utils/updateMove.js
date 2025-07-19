export function updateMove(val, chess, move, setMove, fromState, setFromState, promotionText) {

    let findPiece = chess.get(val);
    let getFromPiece = chess.get(move?.from);
    let getPieceMoves = chess.moves({ square: move?.from });
    let seeTurn = chess.turn()

    
    if (findPiece?.color == getFromPiece?.color && findPiece != undefined && getFromPiece != undefined) {
        setMove((e) => ({ ...e, from: val }))
        setFromState(false)
        return
    } else if (findPiece?.color != seeTurn && getFromPiece == undefined) {
        return
    }
    
    let findEqualsFromGetPiece = Array.isArray(getPieceMoves)? getPieceMoves.find(e=> e.includes('=')) : undefined

    if(findEqualsFromGetPiece){
        return getPieceMoves.map((el) => {
            if (el.includes('=')) {
                if (findPiece != undefined && fromState) {
                    setMove((e) => ({ ...e, from: val, promotion: promotionText }))
                    setFromState(false)
                } else if (fromState == false) {
                    setMove((e) => ({ ...e, to: val }))
                    setFromState(true)
                }
            }
        })
    } else {
        if (findPiece != undefined && fromState) {
            setMove((e) => ({ ...e, from: val }))
            setFromState(false)
        } else if (fromState == false) {
            setMove((e) => ({ ...e, to: val }))
            setFromState(true)
        }
    }

}