import Home from "./pages/Home/Home"
import Search from "./pages/Search/Search";
import Title from "./pages/Title/Title";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/search/:id" element={<Title/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
