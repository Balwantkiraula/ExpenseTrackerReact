
import './App.css';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import React from 'react';
import { BrowserRouter,Routes,Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from './components/pages/Profile';

function App() {
  const [token,setToken] = useState('');
  const [login,setLogin] = useState(false);

  useEffect(()=>{
    const userToken = localStorage.getItem('userCurr');
    console.log(userToken);
    if(!userToken===''){
      setToken(userToken);
      setLogin(true);
    }
    
  },[login])
  return (
    <div className='App'> 
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={ <Login />}/>
        <Route path='/profile' element={   <Profile/>}/>
      </Routes>
    </div>     
     
  );
}

export default App;