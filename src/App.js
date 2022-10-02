import { Routes, Route } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Home from './Modules/Home/Home';
import Login from './Modules/Login/Login';
import Register from './Modules/Register/Register';
import Swap from './Modules/Swap/Swap';
import User from './Modules/User';
import SwapStatus from './Modules/SwapStatus/SwapStatus';
import ExploreSwapRequests from './Modules/ExploreSwapRequests/ExploreSwapRequests';
import ResetPassword from './Modules/ResetPassword/ResetPassword';
import ForgetPassword from './Modules/ForgetPassword/ForgetPassword';
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
        <Route path="/explore-request" element={<ExploreSwapRequests />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App;
