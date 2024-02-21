import './App.css'
import Home from "./pages/home/home"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
