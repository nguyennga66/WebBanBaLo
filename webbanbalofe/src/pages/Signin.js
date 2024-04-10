import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/signin.css";
import "../css/font-awesome.css";

export default function Signin() {
    return (
        <div data-vide-bg="video/keyboard">
        <div className="main-container">
          {/* Header */}
          <div className="header-w3l">
            <h1>Modern Login Form</h1>
          </div>
          {/* Main Content */}
          <div className="main-content-agile">
            <div className="w3ls-pro">
              <h2>Login Now</h2>
            </div>
            <div className="sub-main-w3ls">	
              <form action="#" method="post">
                <input placeholder="Enter your E-mail" name="enter mail" type="email" required />
                <span className="icon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                <input  placeholder="Enter Password" name="Password" type="password" required />
                <span className="icon2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
                <div className="checkbox-w3">
                  <span className="check-w3"><input type="checkbox" />Remember Me</span>
                  <a href="#">Forgot Password?</a>
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
            <p>&copy; 2017 modern Login Form. All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
          </div>
        </div>
      </div>
    );
  }
  