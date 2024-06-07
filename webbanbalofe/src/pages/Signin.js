import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";
import "../css/font-awesome.css";
import axios from 'axios';
import { NavLink } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'email') {
      try {
        const response = await axios.post('http://localhost:8080/check-email', { email: value });
        if (response.data.exists) {
          setEmailError('');
        } else {
          setEmailError('Email không tồn tại');
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", formData);
      console.log(response.data); // Log thông tin người dùng nếu đăng nhập thành công
      localStorage.setItem('user', JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
      setError(''); // Clear error message
      navigate('/');
      window.location.reload();
    } catch (error) {
      // if (error.response) {
        const errorMessage = error.response.data.message || 'Đăng nhập không thành công';
        if (errorMessage === 'Sai mật khẩu') {
          setPasswordError(errorMessage);
        } else {
          setError('Đăng nhập không thành công');
        }
      // } else {
      //   setError('Đăng nhập không thành công');
      // }
      console.error("Đăng nhập không thành công:", error.response);
    }
  };    

    return (
    <div data-vide-bg="video/keyboard">
      <div className="main-container">
        {/* Header */}
        <div className="header-w3l">
          <h1></h1>
        </div>
        {/* Main Content */}
        <div className="main-content-agile">
          <div className="w3ls-pro">
            <h2>Đăng Nhập</h2>
          </div>
          <div className="sub-main-w3ls">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Nhập E-mail"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <span className="icon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
              <input
                placeholder="Nhập mật khẩu"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span className="icon2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              <div className="checkbox-w3">
                <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                <NavLink to="/forgot">Quên mật khẩu?</NavLink>
                <div className="clear"></div>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input type="submit" value="" />
            </form>
            <NavLink to="/register" style={{color: 'white'}}>Bạn chưa có tài khoản? Đăng ký</NavLink>
          </div>
        </div>
        {/* Footer */}
        <div className="footer">
        </div>
      </div>
    </div>
  );
};