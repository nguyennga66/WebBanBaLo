import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import userIcon from "../images/user.svg";
import cartIcon from "../images/cart.svg";
import axios from 'axios';

export default function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setFullName(user.fullName);
      setRole(user.role);
      setId(user.id);
      console.log("useEffect is called");

    }

  }, []); // Truyền một mảng rỗng để useEffect chỉ chạy một lần sau khi component được render

// Function to handle logout
const handleLogout = () => {
  localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
  setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
  setFullName(''); // Xóa tên người dùng hiển thị
};

  return (
    <div>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">N.A<span>.</span></NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Trang chủ</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">Sản phẩm</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Liên hệ</NavLink>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">

              <li className="dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {isLoggedIn ? (
                  <div className="nav-link user-account">
                    {fullName}
                  </div>
                ) : (
                  <img className="nav-link user-account" src={userIcon} alt="User" />
                )}
                {isDropdownVisible && (
                  <div className="dropdown-content">
                    {!isLoggedIn && (
                      <>
                        <NavLink to="/signin">Đăng nhập</NavLink>
                        <NavLink to="/register">Đăng ký</NavLink>
                      </>
                    )}
                    {isLoggedIn && role === 1 && (
                          <div>
                              {
                                <>
                                <a href="#" onClick={handleLogout}>Quản lý người dùng</a>
                                <a href="#" onClick={handleLogout}>Đăng xuất</a>
                                </>
                              }
                          </div>
                        )}
                       {isLoggedIn && role !== 1 && (
                          <div>
                              {
                                <>
                                <NavLink to="/information">Trang cá nhân</NavLink>
                                <a href="#" onClick={handleLogout}>Đăng xuất</a>
                                </>
                              }
                          </div>
                        )}
                  </div>
                )}
              </li>
              <li><NavLink className="nav-link" to={`/cart/${id}`}><img src={cartIcon} alt="Cart" /></NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
