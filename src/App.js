import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  var dark = {
    backgroundColor: "gray",
    color: "white",
    "min-height": "100vh",
    "max-height": "100%",
  };
  return (
    <>
      <Router>
        <div className="App" style={isChecked ? dark : null}>
          <Navbar
            isChecked={isChecked}
            setIsChecked={() => {
              setIsChecked(!isChecked);
            }}
          />
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/about" element={<About isChecked={isChecked} />}></Route>
            <Route
              path="movie/:id"
              element={<MovieDetails isChecked={isChecked} />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
