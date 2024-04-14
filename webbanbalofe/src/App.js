import React from 'react'
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Cart from './pages/Cart'
import Footer from './Component/Footer'
import Header from './Component/Header'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Thankyou from './pages/Thankyou'
import Checkout from './pages/Checkout'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Testimonial from './Component/Testimonial'
import Signin from './pages/Signin';
import Register from './pages/Register';

function App() {
  return (
      <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/blog" element={<Blog/>} />
        <Route path="/thankyou" element={<Thankyou/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/product_page" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      </BrowserRouter>
        </>
  );
}

export default App;
