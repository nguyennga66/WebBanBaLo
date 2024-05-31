import React, { useState } from "react";
import axios from 'axios';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/information.css";

export default function FormEditProfile({ userId, fullName, address, email, phone, onUpdateSuccess }) {
    const [editedFullName, setEditedFullName] = useState(fullName);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedPhone, setEditedPhone] = useState(phone);
    const [errors, setErrors] = useState({});

    const validate = (name, value, currentErrors) => {
        const newErrors = { ...currentErrors };
        switch (name) {
            case 'fullName':
                if (!value) {
                    newErrors.fullName = "Họ và tên không được để trống";
                } else {
                    delete newErrors.fullName;
                }
                break;
            case 'address':
                if (!value) {
                    newErrors.address = "Địa chỉ không được để trống";
                } else {
                    delete newErrors.address;
                }
                break;
            case 'email':
                if (!value) {
                    newErrors.email = "Email không được để trống";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Email không hợp lệ";
                } else {
                    delete newErrors.email;
                }
                break;
            case 'phone':
                if (!value) {
                    newErrors.phone = "Số điện thoại không được để trống";
                } else if (!/^\d{10}$/.test(value)) {
                    newErrors.phone = "Số điện thoại không hợp lệ";
                } else {
                    delete newErrors.phone;
                }
                break;
            default:
                break;
        }
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        const newErrors = validate(name, value, errors);
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            return;
        }
        try {
            const user = {
                fullName: editedFullName,
                address: editedAddress,
                email: editedEmail,
                phone: editedPhone
            };
            const response = await axios.put(`http://localhost:8080/users/${userId}`, user);
            if (response.status === 200) {
                onUpdateSuccess(user);
            }
        } catch (error) {
            console.error('Error updating user:', error);
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
}
