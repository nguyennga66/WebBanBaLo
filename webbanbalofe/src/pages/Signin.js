import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";
import "../css/font-awesome.css";

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
              <h2>Đăng Nhập</h2>
            </div>
            <div className="sub-main-w3ls">	
              <form action="#" method="post">
                <input placeholder="Nhập E-mail" name="enter mail" type="email" required />
                <span className="icon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                <input  placeholder="Nhập mật khẩu" name="Password" type="password" required />
                <span className="icon2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
                <div className="checkbox-w3">
                  <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                  <a href="#">Quên mật khẩu?</a>
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
  