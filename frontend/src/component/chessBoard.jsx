import { Chess } from "chess.js"
import { useState, useRef, useEffect } from "react";
import Rules from "../component/rules.jsx";
import BoardElements from "./boardElement.jsx";
import useStore from "../Store.jsx";
import SocketIo from "./socketio.jsx";
import { LuLoaderCircle } from "react-icons/lu";

export default function ChessBoard() {

    let chessRef = useRef(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'))
    let chess = chessRef.current
    let { promotionText, setPromotionText, restartGame, setRestartGame, userColor, partner, showPromotionInput } = useStore();
    let [board, setBoard] = useState(chess.board().reverse());
    let [move, setMove] = useState({
        from: null,
        to: null,
        promotion: null
    })
    let seeTurn = chess.turn();
    let condForPlay = sessionStorage.getItem('condForPlay')

    return (
        <>
            {condForPlay == 'true' && <SocketIo chess={chess} setBoard={setBoard} />}
            <Rules chess={chess} setRestartGame={setRestartGame} board={board} restartGame={restartGame} setBoard={setBoard} move={move} />
            {condForPlay == 'true' ?
                (partner ?
                    <div
                    style={{
                        backgroundImage: `
                    repeating-linear-gradient(to right, rgba(80, 70, 50, 56) 0px, rgba(80, 70, 50, 56) 1px, transparent 1px, transparent 50px),
                      repeating-linear-gradient(to bottom, rgba(80, 70, 50, 56) 0px, rgba(80, 70, 50, 56) 1px, transparent 1px, transparent 50px),
                      linear-gradient(180deg,rgba(256, 244, 136, 56) 0%, rgba(80, 70, 50, 56) 100%)`
                    }}
                    className="h-screen w-screen flex justify-between items-center flex-col md:flex-row md:justify-center">
                    <div className="flex-[0.7] flex justify-center items-center md:flex-[0.8]">
                        <div className=" h-[350px] w-[350px] min-[450px]:h-[400px] min-[450px]:w-[400px] md:h-[500px] md:w-[500px] lg:w-[550px] lg:h-[550px]  grid grid-cols-8"
                        >
                            <BoardElements board={board} move={move} chess={chess} setMove={setMove} setBoard={setBoard} />
                        </div>
                    </div>
                    <div className="flex-[0.3] flex justify-start items-center pr-5 md:flex-[0.2]">
                        <div className=" h-36 w-44 bg-yellow-900/50 rounded-xl backdrop-blur-sm flex justify-center items-center flex-col text-white">
                            <p>Turn : {seeTurn} </p>
                            <p>your color : {userColor} </p>
                            {
                                showPromotionInput && 
                            <div className="flex justify-center items-center flex-col ">
                                <p>Set promotion piece</p>
                                <p className="text-white/70">*single letter</p>
                                <input className="w-2/3 text-black p-1 rounded-lg"
                                    type="string" value={promotionText} onChange={(e) => setPromotionText(e.currentTarget.value)} />
                            </div>
                            }
                        </div>
                    </div>
                </div>
                    :
                    <div className="h-screen w-screen flex justify-center gap-5 items-center bg-black/90">
                        <LuLoaderCircle className="text-2xl text-white/30 animate-spin" />
                        <h1 className=" text-white/30 hover:text-white/100">Waiting for the other player</h1>
                    </div>
                ) :
                <div
                    style={{
                        backgroundImage: `
                    repeating-linear-gradient(to right, rgba(80, 70, 50, 56) 0px, rgba(80, 70, 50, 56) 1px, transparent 1px, transparent 50px),
                      repeating-linear-gradient(to bottom, rgba(80, 70, 50, 56) 0px, rgba(80, 70, 50, 56) 1px, transparent 1px, transparent 50px),
                      linear-gradient(180deg,rgba(256, 244, 136, 56) 0%, rgba(80, 70, 50, 56) 100%)`
                    }}
                    className="h-screen w-screen flex justify-between items-center flex-col md:flex-row md:justify-center">
                    <div className="flex-[0.7] flex justify-center items-center md:flex-[0.8]">
                        <div className=" h-[350px] w-[350px] min-[450px]:h-[400px] min-[450px]:w-[400px] md:h-[500px] md:w-[500px] lg:w-[550px] lg:h-[550px]  grid grid-cols-8"
                        >
                            <BoardElements board={board} move={move} chess={chess} setMove={setMove} setBoard={setBoard} />
                        </div>
                    </div>
                    <div className="flex-[0.3] flex justify-start items-center pr-5 md:flex-[0.2]">
                        <div className=" h-36 w-44 bg-yellow-900/50 rounded-xl backdrop-blur-sm flex justify-center items-center flex-col text-white">
                            <p>Turn : {seeTurn} </p>
                            {
                                showPromotionInput && 
                            <div className="flex justify-center items-center flex-col ">
                                <p>Set promotion piece</p>
                                <p className="text-white/70">*single letter</p>
                                <input className="w-2/3 text-black p-1 rounded-lg"
                                    type="string" value={promotionText} onChange={(e) => setPromotionText(e.currentTarget.value)} />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}