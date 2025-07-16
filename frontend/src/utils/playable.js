export default function nextPlayable( move, chess ){

    let returnVal = chess.moves({ square : move?.from })

    returnVal = returnVal.map((el)=> {
        if(el.includes('x') && el.length == 4){
            return el.slice(2)
        } else if(el.includes('=Q') && el.length == 6){
            return el.slice(2,4)
        } else if(el.length == 5 && el.includes('=Q+')){
            return el.slice(0,2)
        } else if(el.length == 3){
            return el.slice(1)
        } else if(el.length == 5 && el.includes('+')){
            return el.slice(2,4)
        } else if(el.length == 4 && el.includes('#')){
            return el.slice(1,3)
        }else {
            return el
        }
    })


    return returnVal
    
}