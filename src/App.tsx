import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages"
import Register from "./pages/register"
import Login from "./pages/login"
import Game from "./pages/game"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
