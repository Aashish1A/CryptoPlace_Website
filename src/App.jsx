import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import Coin from "./Pages/Coin/Coin"
import Home from "./Pages/Home/Home"
import { Routes, Route } from "react-router-dom"

function App() {
 
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 via-indigo-600 to-blue-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coin/:coinId" element={<Coin />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
