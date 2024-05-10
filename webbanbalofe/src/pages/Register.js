import React, { useState } from 'react';
import axios from 'axios';

function UserRegistration() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/signup', formData);
            console.log(response.data);
            setError('Đăng ký thành công');
            // Xử lý khi đăng ký thành công
        } catch (error) {
            setError('Đăng ký khồng thành công');
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
            <h2>Đăng Ký</h2>
          </div>
          <div className="sub-main-w3ls">	
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        placeholder="Nhập họ và tên"
                        type="name" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        placeholder="Nhập số điện thoại"
                        type="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        placeholder="Nhập địa chỉ chi tiết"
                        type="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                <span className="regis1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                    <input 
                        placeholder="Nhập E-mail"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                <span className="regis2"><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
                    <input 
                        placeholder="Nhập mật khẩu"
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        placeholder="Nhập lại mật khẩu"
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="checkbox-w3">
                  <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                  {/* <NavLink to="/signin">Đăng nhập</NavLink> */}
                  <div className="clear"></div>
                </div>
                <div class="social-icons"> 
							  <ul>
								  <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
								  <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
								  <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li> 
							  </ul>  
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
}

export default UserRegistration;
