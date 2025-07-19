import {
    TbChessRookFilled, TbChessRook, TbChessQueenFilled, TbChessQueen, TbChessKnightFilled,
    TbChessKnight, TbChessKingFilled, TbChessKing, TbChessFilled, TbChess, TbChessBishopFilled, TbChessBishop
} from "react-icons/tb";

export function getRightPiece(boardPiece) {

    if (boardPiece == null) {
        return ''
    } else if (boardPiece.type === 'p' && boardPiece.color === 'b') {
        return <TbChessFilled />
    } else if (boardPiece.type === 'p' && boardPiece.color === 'w') {
        return <TbChess />
    } else if (boardPiece.type === 'r' && boardPiece.color === 'b') {
        return <TbChessRookFilled />
    } else if (boardPiece.type === 'r' && boardPiece.color === 'w') {
        return <TbChessRook />
    } else if (boardPiece.type === 'n' && boardPiece.color === 'b') {
        return <TbChessKnightFilled />
    } else if (boardPiece.type === 'n' && boardPiece.color === 'w') {
        return <TbChessKnight />
    } else if (boardPiece.type === 'q' && boardPiece.color === 'b') {
        return <TbChessQueenFilled />
    } else if (boardPiece.type === 'q' && boardPiece.color === 'w') {
        return <TbChessQueen />
    } else if (boardPiece.type === 'k' && boardPiece.color === 'b') {
        return <TbChessKingFilled />
    } else if (boardPiece.type === 'k' && boardPiece.color === 'w') {
        return <TbChessKing />
    } else if (boardPiece.type === 'b' && boardPiece.color === 'b') {
        return <TbChessBishopFilled />
    } else if (boardPiece.type === 'b' && boardPiece.color === 'w') {
        return <TbChessBishop />
    }
}