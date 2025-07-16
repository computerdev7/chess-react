import { BLACK, WHITE } from "chess.js"

export default function attacker( move, chess ){

    let checkTurn = chess.turn()

    if(checkTurn == 'w'){

        let findAttackers = chess.attackers(move?.from,BLACK)

        return findAttackers

    } else if (checkTurn == 'b'){

        let findAttackers = chess.attackers(move?.from,WHITE)

        return findAttackers

    }
}