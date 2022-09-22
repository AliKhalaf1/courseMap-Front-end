import { Routes, Route } from "react-router-dom";
import Header from "./Modules/Header/Header";
import Home from "./Modules/Home/Home";
import Login from "./Modules/Login/Login";
import Register from "./Modules/Register/Register";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
