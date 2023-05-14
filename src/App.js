import './App.css';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdataProfile from './components/UpdataProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/update' element={ <UpdataProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
