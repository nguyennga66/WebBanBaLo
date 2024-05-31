import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateField = (name, value) => {
        let errorMsg = '';
        switch (name) {
            case 'email':
                if (!validateEmail(value)) {
                    errorMsg = 'Email không hợp lệ';
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    errorMsg = 'Số điện thoại không hợp lệ';
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    errorMsg = 'Mật khẩu phải chứa ít nhất 6 ký tự';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    errorMsg = 'Mật khẩu không khớp';
                }
                break;
            default:
                if (value.trim() === '') {
                    errorMsg = 'Trường này không được để trống';
                }
                break;
        }
        setErrors({
            ...errors,
            [name]: errorMsg
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra tất cả các trường trước khi gửi
        Object.keys(formData).forEach((name) => {
            validateField(name, formData[name]);
        });

        // Kiểm tra xem có lỗi nào không
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/signup', formData);
            console.log(response.data);
            setSuccess('Đăng ký thành công');
            setErrors({});
            setFormData({
                fullName: '',
                phone: '',
                address: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            navigate('/signin');

        } catch (error) {
            setErrors({ submit: error.response.data.message || 'Đăng ký không thành công' });
            setSuccess('');
        }
    };

    return (
      <div data-vide-bg="video/keyboard">
      <div className="main-container">
        <div className="header-w3l">
          <h1></h1>
        </div>
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
                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
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
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
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
                    {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
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
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
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
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                </div>
                <div className="checkbox-w3">
                  <span className="check-w3"><input type="checkbox" />Lưu tài khoản</span>
                  <div className="clear"></div>
                </div>
                <div className="social-icons"> 
							  <ul>
								  <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
								  <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
								  <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li> 
							  </ul>  
						    </div>
                {errors.submit && <p style={{ color: 'red' }}>{errors.submit}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <input type="submit" value="" />
            </form>
            </div>
          </div>
          <div className="footer">
          </div>
        </div>
      </div>
    );
}

export default UserRegistration;