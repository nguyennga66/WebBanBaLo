import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";
import "../css/font-awesome.css";
import axios from 'axios';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:8080/signin", formData);
          console.log(response.data); // Log thông tin người dùng nếu đăng nhập thành công
          setError('Đăng nhập thành công');
      } catch (error) {
          console.error("Đăng nhập không thành công:", error.response.data);
          setError('Đăng nhập không thành công');
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
                                name="enter mail"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleSubmit}
                            />
                            <span className="icon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                            <input
                                placeholder="Nhập mật khẩu"
                                name="Password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleSubmit}
                            />
                            <span className="icon2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
                            <div className="checkbox-w3">
                                <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                                <a href="#">Quên mật khẩu?</a>
                                <div className="clear"></div>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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
};