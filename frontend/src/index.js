import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import Homepage from './Landing_page/home/Homepage';

import Signup from './Landing_page/signup/Signup';
import Login from './Landing_page/Login.js';
import CompleteProfile from "./Landing_page/CompleteProfile";

import AboutPage from './Landing_page/about/AboutPage';
import PricingPage from './Landing_page/pricing/PricingPage';
import SupportPage from './Landing_page/support/SupportPage';
import ProductsPage from './Landing_page/products/ProductsPage';

import Navbar from './Landing_page/Navbar.js';
import Footer from './Landing_page/Footer.js';
import NotFound from './Landing_page/NotFound.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
       
      <BrowserRouter>
      <Navbar />
      <Routes>

            
            <Route path="/" element={<Homepage />} />
           

            <Route path="/Signup" element={<Signup />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route path="/About" element={<AboutPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/Pricing" element={<PricingPage />} />
            <Route path="/Support" element={<SupportPage />} />
            <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </BrowserRouter>
);


