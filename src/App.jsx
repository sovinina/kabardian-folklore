
import { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';

import { EpochList } from './Components/EpochList/EpochList';
import { EpochPage } from './Components/EpochPage/EpochPage';
import { Work } from './Components/Work/Work';
import { Search } from './Components/Search/Search';
import FlipBook from './Components/Fairytales/Fairytales';
import { About } from './Components/About/About';
import { Admin } from './Components/Admin/Admin';
import { Login } from './Components/Admin/Login';
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<EpochList/>}/>
          <Route path='/ancient-folklore' element={<EpochPage id={1}/>}/>
          <Route path='/XVI-XVII-folklore' element={<EpochPage id={2}/>}/>
          <Route path='/XVIII-XIX-folklore' element={<EpochPage id={3}/>}/>
          <Route path='/work/:id' element={<Work/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/fairytales' element={<FlipBook/>}/>
          <Route path='/about' element={<About/>}/>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='/login' element={<Login onLogin={handleLogin} />}/>
          <Route path='/admin' element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


