import React from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import userIcon from "../images/user.svg";
import cartIcon from "../images/cart.svg";

export default function Header() {
  return (
    <div>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Furni<span>.</span></NavLink>

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
                <NavLink className="nav-link" to="/about">About us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services">Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Liên hệ</NavLink>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li><NavLink className="nav-link" to="/"><img src={userIcon} alt="User" /></NavLink></li>
              <li><NavLink className="nav-link" to="/cart"><img src={cartIcon} alt="Cart" /></NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
