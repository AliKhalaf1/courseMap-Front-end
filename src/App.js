import { Routes, Route } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Home from './Modules/Home/Home';
import Login from './Modules/Login/Login';
import Register from './Modules/Register/Register';
import Swap from './Modules/Swap/Swap';
import User from './Modules/User';
import SwapStatus from './Modules/SwapStatus/SwapStatus';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/user" element={<User />} />
        <Route path="/swapstatus" element={<SwapStatus />} />
      </Routes>
    </>
  );
}

export default App;
