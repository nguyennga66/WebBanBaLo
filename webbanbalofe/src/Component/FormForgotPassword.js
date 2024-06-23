import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'; // Import validator để sử dụng các hàm kiểm tra

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (value) => {
        let newErrors = {};

        if (!validator.trim(value)) {
            newErrors.email = 'Vui lòng nhập địa chỉ email';
        } else if (!validator.isEmail(value)) {
            newErrors.email = 'Địa chỉ email không hợp lệ';
        }

        setErrors(newErrors);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            validateEmail(value); // Validate ngay khi nhập liệu thay đổi
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        validateEmail(email); // Validate trước khi submit

        if (Object.keys(errors).length === 0) {
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
                                onChange={handleInputChange} // Xử lý thay đổi giá trị và validate ngay khi nhập liệu
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                            <br></br>
                            <input type="submit" value="" onClick={handleForgotPassword} />
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
                {/* Footer */}
                <div className="footer"></div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;