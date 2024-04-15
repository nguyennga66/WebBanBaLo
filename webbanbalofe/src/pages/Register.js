import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";
import "../css/font-awesome.css";
import { NavLink } from "react-router-dom";

export default function Signin() {
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
              <h2>Đăng Ký</h2>
            </div>
            <div className="sub-main-w3ls">	
              <form action="#" method="post">
                <input placeholder="Tên người dùng" name="enter name" type="name" required />
                <input placeholder="Nhập E-mail" name="enter mail" type="email" required />
                <span className="regis1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                <input  placeholder="Nhập mật khẩu" name="Password" type="password" required />
                <span className="regis2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
                <input  placeholder="Nhập lại mật khẩu" name="Re-Password" type="password" required />
                <div className="checkbox-w3">
                  <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                  <NavLink to="/signin">Đăng nhập</NavLink>
                  <div className="clear"></div>
                </div>
                <div className="social-icons"> 
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li> 
                  </ul>  
                </div>
                <input type="submit" value="" />
              </form>
            </div>
          </div>
          {/* Footer */}
          <div className="footer">
          </div>
        </div>
      </div>
    );
  }