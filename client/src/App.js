import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchRental from './pages/SearchRental';
import OfferVehicle from './pages/OfferVehicle';
import VehicleDetail from './pages/VehicleDetail';
import Account from './pages/Account';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import React from 'react';
import { useAuth } from './context/AuthContext';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';

function App() {
  const { user } = useAuth();
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/searchrental" element={user ? <SearchRental /> : <Navigate to="/login" />} />
            <Route exact path='/offervehicle' element={<OfferVehicle/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/vehicledetail/:vehicleId" element={<VehicleDetail />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
