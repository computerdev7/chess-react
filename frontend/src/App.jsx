import ChessBoard from "./component/chessBoard.jsx"
import {Routes, Route} from "react-router"
import Home from "./pages/Home.jsx"
import GamePage from "./pages/GamePage.jsx"

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  )
}

