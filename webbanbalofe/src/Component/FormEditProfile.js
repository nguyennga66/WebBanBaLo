import React, { useState } from 'react';
import validator from 'validator';

const FormComponent = ({ fullName: initialFullName, address: initialAddress, email: initialEmail, phone: initialPhone, onUpdateSuccess }) => {
    const [editedFullName, setEditedFullName] = useState(initialFullName);
    const [editedAddress, setEditedAddress] = useState(initialAddress);
    const [editedEmail, setEditedEmail] = useState(initialEmail);
    const [editedPhone, setEditedPhone] = useState(initialPhone);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!validator.trim(editedFullName)) {
            newErrors.fullName = "Họ và tên không được để trống";
        } else {
            delete newErrors.fullName; // Xóa lỗi nếu hợp lệ
        }

        if (!validator.trim(editedAddress)) {
            newErrors.address = "Địa chỉ không được để trống";
        } else {
            delete newErrors.address; // Xóa lỗi nếu hợp lệ
        }

        if (!validator.trim(editedEmail)) {
            newErrors.email = "Email không được để trống";
        } else if (!validator.isEmail(editedEmail)) {
            newErrors.email = "Email không hợp lệ";
        } else {
            delete newErrors.email; // Xóa lỗi nếu hợp lệ
        }

        if (!validator.trim(editedPhone)) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!validator.isMobilePhone(editedPhone, 'vi-VN')) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        } else {
            delete newErrors.phone; // Xóa lỗi nếu hợp lệ
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị ngay khi có sự thay đổi
        switch (name) {
            case 'fullName':
                setEditedFullName(value);
                break;
            case 'address':
                setEditedAddress(value);
                break;
            case 'email':
                setEditedEmail(value);
                break;
            case 'phone':
                setEditedPhone(value);
                break;
            default:
                break;
        }

        // Kiểm tra validation ngay khi người dùng nhập liệu
        validate();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const user = {
                    fullName: editedFullName,
                    address: editedAddress,
                    email: editedEmail,
                    phone: editedPhone
                };
                // Gọi API để cập nhật thông tin người dùng
                onUpdateSuccess(user);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label htmlFor="fullName">Họ và tên:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    name="fullName"
                                    value={editedFullName}
                                    onChange={handleInputChange}
                                />
                                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                            </div>
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label htmlFor="address">Địa chỉ:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={editedAddress}
                                    onChange={handleInputChange}
                                />
                                {errors.address && <small className="text-danger">{errors.address}</small>}
                            </div>
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={editedEmail}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label htmlFor="phone">Số điện thoại:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={editedPhone}
                                    onChange={handleInputChange}
                                />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;