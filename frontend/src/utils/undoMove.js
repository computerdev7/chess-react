export function undoMove(chess, setTimer, setBoard) {

    let reverseM = chess.undo();

    chess.load(reverseM.before);
    setBoard(chess.board().reverse());
    setTimer(false);

}