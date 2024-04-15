import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";

import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa6";

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

                <button type="submit" value="Đăng nhập">Đăng nhập</button>
                <div className="social-icons"> 
                  <ul>
                  <li><a href="#"><FaFacebookF style={{ color: 'blue', fontSize: '25px' }}/></a></li>
            <li><a href="#"><FaTwitter style={{ color: 'blue', fontSize: '25px' }}/></a></li>
                    <li><a href="#"><FaGoogle style={{ color: 'blue', fontSize: '25px' }}/></a></li> 
                  </ul>  
                </div>

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
  