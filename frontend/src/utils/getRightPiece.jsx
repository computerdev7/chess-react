import {
    TbChessRookFilled, TbChessRook, TbChessQueenFilled, TbChessQueen, TbChessKnightFilled,
    TbChessKnight, TbChessKingFilled, TbChessKing, TbChessFilled, TbChess, TbChessBishopFilled, TbChessBishop
} from "react-icons/tb";

export function getRightPiece(boardPiece) {

    if (boardPiece == null) {
        return ''
    } else if (boardPiece.type === 'p' && boardPiece.color === 'b') {
        return <TbChessFilled className="text-black " />
    } else if (boardPiece.type === 'p' && boardPiece.color === 'w') {
        return <TbChess className="text-white" />
    } else if (boardPiece.type === 'r' && boardPiece.color === 'b') {
        return <TbChessRookFilled className="text-black" />
    } else if (boardPiece.type === 'r' && boardPiece.color === 'w') {
        return <TbChessRook className="text-white" />
    } else if (boardPiece.type === 'n' && boardPiece.color === 'b') {
        return <TbChessKnightFilled className="text-black" />
    } else if (boardPiece.type === 'n' && boardPiece.color === 'w') {
        return <TbChessKnight className="text-white" />
    } else if (boardPiece.type === 'q' && boardPiece.color === 'b') {
        return <TbChessQueenFilled className="text-black" />
    } else if (boardPiece.type === 'q' && boardPiece.color === 'w') {
        return <TbChessQueen className="text-white" />
    } else if (boardPiece.type === 'k' && boardPiece.color === 'b') {
        return <TbChessKingFilled className="text-black" />
    } else if (boardPiece.type === 'k' && boardPiece.color === 'w') {
        return <TbChessKing className="text-white" />
    } else if (boardPiece.type === 'b' && boardPiece.color === 'b') {
        return <TbChessBishopFilled className="text-black" />
    } else if (boardPiece.type === 'b' && boardPiece.color === 'w') {
        return <TbChessBishop className="text-white" />
    }
}