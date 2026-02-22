import {Routes, Route} from "react-router"
import Home from "./pages/Home.jsx"
import GamePage from "./pages/GamePage.jsx"

export default function App() {
  console.log('connected with deployment')
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  )
}

