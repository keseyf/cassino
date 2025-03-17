import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages"
import Register from "./pages/register"
import Login from "./pages/login"
import Games from "./pages/games"
import TermsPage from "./pages/terms"
import RechargePage from "./pages/recharge"
import Profile from "./pages/profile"
import { UosevenPage } from "./games/uoseven"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games/underover7" element={<UosevenPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
