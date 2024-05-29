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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <label htmlFor="fullName" >Họ và tên:</label>
                <input type="text" className="form-control" id="fullName" value={editedFullName} onChange={(e) => setEditedFullName(e.target.value)} />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
                <label htmlFor="address">Địa chỉ:</label>
                <input type="text" className="form-control" id="address" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
                <label htmlFor="phone">Số điện thoại:</label>
                <input type="text" className="form-control" id="phone" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
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
