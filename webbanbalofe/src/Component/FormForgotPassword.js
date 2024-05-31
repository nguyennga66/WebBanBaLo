import React, { useState } from 'react';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/signin.css";
import "../css/font-awesome.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/forgot-password', { email });
            setMessage('Email được gửi thành công');
            if (response.status === 200) {
                // Chuyển hướng đến trang đăng nhập sau khi gửi email thành công
                navigate('/signin');
            }
        } catch (error) {
            setMessage('Error: ' + error.response.data);
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
              <h2>Quên mật khẩu</h2>
            </div>
            <div className="sub-main-w3ls">
              <form>
                <input
                  placeholder="Nhập E-mail"
                  name="email"
                  type="email"
                  required
                  value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <br></br>
                <input type="submit" value="" onClick={handleForgotPassword} />
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
          {/* Footer */}
          <div className="footer">
          </div>
        </div>
      </div>
    );
};

export default ForgotPasswordForm;
