import React from 'react'
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Thankyou from './pages/Thankyou'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Signin from './pages/Signin';
import Register from './pages/Register';
import Information from './pages/Information';
import FormEditProfile from './Component/FormEditProfile';
import ForgotPassword from './pages/ForgotPass';
import FormForgotPassword from './Component/FormForgotPassword';
import Admin from './pages/admin/Home';
import UserManagement from './pages/admin/UserManagement'
import ProductManagement from './pages/admin/ProductManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import OrderList from './pages/admin/OrderList'

function App() {
  return (
      <>
      <BrowserRouter>
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
        <Route path="/information/:userId" element={<Information />} />
        <Route path="/editform" element={<FormEditProfile />} />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/forgotform" element={<FormForgotPassword/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/user_manage" element={<UserManagement/>} />
        <Route path="/product_manage" element={<ProductManagement/>} />
        <Route path="/category_manage" element={<CategoryManagement/>} />
        <Route path="/order_list" element={<OrderList/>} />
      </Routes>
      </BrowserRouter>
        </>
  );
}

export default App;
