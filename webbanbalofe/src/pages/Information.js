import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormEditProfile from '../Component/FormEditProfile';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/information.css";

export default function Information() {
    const [tab, setTab] = useState('personal'); 
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                const userData = response.data;
                setFullName(userData.fullName);
                setAddress(userData.address);
                setEmail(userData.email);
                setPhone(userData.phone);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
        // Xóa tất cả thông tin liên quan đến người dùng từ localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        // Nếu bạn lưu các thông tin khác, hãy xóa chúng tại đây

        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);

        // Điều hướng người dùng về trang đăng nhập
        window.location.href = '/signin';
    };

    const handleEditProfile = () => {
        setShowEditForm(true);
    };

    const handleUpdateSuccess = (updatedUserData) => {
        setShowEditForm(false);
        setFullName(updatedUserData.fullName);
        setAddress(updatedUserData.address);
        setEmail(updatedUserData.email);
        setPhone(updatedUserData.phone);
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordChangeMessage("Mật khẩu mới và xác nhận mật khẩu không khớp");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8080/users/pass/${userId}`, {
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            if (response.status === 200) {
                setPasswordChangeMessage("Thay đổi mật khẩu thành công");
            } else {
                setPasswordChangeMessage("Mật khẩu cũ không đúng");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setPasswordChangeMessage("Mật khẩu cũ không đúng");
            } else {
                setPasswordChangeMessage("Có lỗi xảy ra, vui lòng thử lại");
            }
        }
        window.location.href = `/information/${userId}`;
    };
        

    return (
        <div className="main-wrapper">
            {/* Main Content */}
            <div className="main-content-wrap section-ptb my-account-page" style={{ padding: '30px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="account-dashboard">
                                <div className="dashboard-upper-info">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col-lg-3 col-md-12">
                                            <div className="d-single-info" style={{ height: '60px', padding: '20px 0' }}>
                                                <p className="user-name"><b>Xin chào {fullName}</b><span></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 col-lg-2">
                                        <ul role="tablist" className="nav flex-column dashboard-list" style={{ textAlign: 'left' }}>
                                            <li className={`nav-item ${tab === 'personal' ? 'active' : ''}`}>
                                                <NavLink className="nav-link" onClick={() => setTab('personal')}>Thông tin cá nhân</NavLink>
                                            </li>
                                            <li className={`nav-item ${tab === 'orders' ? 'active' : ''}`}>
                                                <NavLink className="nav-link" onClick={() => setTab('orders')}>Đơn hàng</NavLink>
                                            </li>
                                            <li className={`nav-item ${tab === 'changePass' ? 'active' : ''}`}>
                                                <NavLink className="nav-link" onClick={() => setTab('changePass')}>Thay đổi mật khẩu</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" onClick={handleLogout}>Đăng xuất</NavLink>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-md-12 col-lg-10">
                                        <div className="tab-content dashboard-content">
                                            {tab === 'personal' && (
                                                <div className="tab-pane active" id="dashboard">
                                                    <div className="row">
                                                        <h4><b>Thông tin cá nhân <span className="sp111" style={{ textAlign: 'center' }}></span></b></h4>
                                                        <br />
                                                        <br />
                                                        {showEditForm ? (
                                                            <FormEditProfile
                                                                userId={userId}
                                                                fullName={fullName}
                                                                address={address}
                                                                email={email}
                                                                phone={phone}
                                                                onUpdateSuccess={handleUpdateSuccess}
                                                            />
                                                        ) : (
                                                            <div className="col-md-12">
                                                                <p style={{ textAlign: 'left' }}>Họ và tên: {fullName}</p>
                                                                <p style={{ textAlign: 'left' }}>Email: {email}</p>
                                                                <p style={{ textAlign: 'left' }}>Số điện thoại: {phone}</p>
                                                                <p style={{ textAlign: 'left' }}>Địa chỉ: {address}</p>
                                                                <button className="btn btn-primary" onClick={handleEditProfile}>Sửa hồ sơ</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {tab === 'orders' && (
                                                <div className="tab-pane active" id="dashboard">
                                                    <div className="table-responsive d222">
                                                        <h4><b>Đơn hàng<span className="sp111" style={{ textAlign: 'center' }}></span></b></h4>
                                                        <table className="table">
                                                            {/* Dữ liệu đơn hàng */}
                                                        </table>
                                                    </div>
                                                </div>
                                            )}

{tab === 'changePass' && (
                                                <div className="tab-pane active" id="dashboard">
                                                    <div className="row">
                                                        <h4><b>Thay đổi mật khẩu <span className="sp111" style={{ textAlign: 'center' }}></span></b></h4>
                                                        <br />
                                                        <br />
                                                        <div className="row justify-content-center">
                                                        <div className="col-md-6">
                                                            <form>
                                                                <div className="form-group" style={{ textAlign: 'left' }}>
                                                                    <label htmlFor="oldPassword">Mật khẩu cũ</label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="oldPassword"
                                                                        value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group" style={{ textAlign: 'left' }}>
                                                                    <label htmlFor="newPassword">Mật khẩu mới</label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="newPassword"
                                                                        value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group" style={{ textAlign: 'left' }}>
                                                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="confirmPassword"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                                {passwordChangeMessage && (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {passwordChangeMessage}
                                                                    </div>
                                                                )}
                                                                <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>Lưu</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
