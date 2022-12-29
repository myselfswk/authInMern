import React from 'react';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import Main from './components/Main';

import './App.css';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import EmailVerify from './components/EmailVerify';
import ForgetPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import QRCodeGenerator from './components/QRCode';

function App() {
  const user = localStorage.getItem('token');

  return (
    <Routes>
      {
        user && <Route path='/' element={<Main />} />
      }
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/' element={<Navigate replace to={'/login'} />} />
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/password-reset/:id/:token' element={<PasswordReset />} />

      <Route path='/qrcode' element={<QRCodeGenerator />} />
    </Routes>
  );
}

export default App;
