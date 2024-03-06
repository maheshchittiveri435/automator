// App.js (or your main routing component)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInSide from './components/SignInSide';
import ForgotPassword from './components/ForgotPassword'; // Make sure to import ForgotPassword
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
