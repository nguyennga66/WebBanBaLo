import React from 'react'
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Cart from './pages/Cart'
import Footer from './Component/Footer'
import Header from './Component/Header'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Thankyou from './pages/Thankyou'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Signin from './pages/Signin';
import Register from './pages/Register';
import Information from './pages/Information';

function App() {
  return (
      <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/thankyou" element={<Thankyou/>}/>
        <Route path="/cart/:userId" element={<Cart/>} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/product_page/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="information" element={<Information />} />
      </Routes>
      <Footer />
      </BrowserRouter>
        </>
  );
}

export default App;
