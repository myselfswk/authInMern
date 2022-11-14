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
    </Routes>
  );
}

export default App;
