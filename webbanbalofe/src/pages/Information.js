import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/information.css"
import axios from 'axios';

export default function Information(){
    const [fullName, setFullName] = useState("");
    const [address, setAdress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setIsLoggedIn(true);
          setFullName(user.fullName);
          setAdress(user.address);
          setEmail(user.email);
          setPhone(user.phone);
          console.log("useEffect is called");
    
        }
    
      }, []);

      const handleLogout = () => {
        localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
        setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
        setFullName(''); // Xóa tên người dùng hiển thị
      };
    return (
        <div className="main-wrapper">

            {/* Main Content */}
            <div className="main-content-wrap section-ptb my-account-page" style={{ padding: '30px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Account Dashboard */}
                            <div className="account-dashboard">
                                {/* Dashboard Upper Info */}
                                <div className="dashboard-upper-info">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col-lg-3 col-md-12">
                                            <div className="d-single-info" style={{ height: '60px', padding: '20px 0' }}>
                                                <p className="user-name"><b>Xin chào {fullName}</b><span></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Navigation */}
                                <div className="row">
                                    <div className="col-md-12 col-lg-2">
                                        {/* Nav tabs */}
                                        <ul role="tablist" className="nav flex-column dashboard-list" style={{ textAlign: 'left' }}>
                                            <NavLink to="#account-details" data-bs-toggle="tab" className="nav-link" >Thông tin cá nhân</NavLink>
                                            <NavLink to="#orders" data-bs-toggle="tab" className="nav-link">Đơn hàng</NavLink>
                                            <NavLink to="/change_pass" className="nav-link">Thay đổi mật khẩu</NavLink>
                                            <NavLink to="#" onClick={handleLogout}>Đăng xuất</NavLink>
                                        </ul>
                                    </div>

                                    <div className="col-md-12 col-lg-10">
                                        <div className="tab-content dashboard-content">
                                        <div className="tab-pane active" id="dashboard">
    <div className="row">
            <h4><b>Thông tin cá nhân <span className="sp111" style={{ textAlign: 'center' }}></span></b></h4>
            <br />
            <div className="col-md-4">
            <p style={{ textAlign: 'left' }}>Họ và tên: {fullName}</p>
            <p style={{ textAlign: 'left' }}>Email: {email}</p>
            </div>
            <div className="col-md-8">
            <p style={{ textAlign: 'left' }}>Số điện thoại: {phone}</p>
            <p style={{ textAlign: 'left' }}>Địa chỉ: {address}</p>
        </div>
       
    </div>
    <div className="table-responsive d222">
    <h4><b>Đơn hàng<span className="sp111" style={{ textAlign: 'center' }}></span></b></h4>
        <table className="table">
            {/* <thead>
                <tr>
                    <th>No</th>
                    <th>Recipient</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Details</th>
                    <th>Action</th>
                </tr>
            </thead> */}
            {/* <tbody> */}
                {/* {donHang.map(dh => (
                    <tr key={dh.idOrder}>
                        <td>{dh.idOrder}</td>
                        <td>{dh.nameRecipient}</td>
                        <td>{dh.dateOrder}</td>
                        {dh.status === '1' ? (
                            <td>Browse</td>
                        ) : (
                            <td>Not yet</td>
                        )}
                        <td>{dh.totalMoney}00 đ</td>
                        <td>
                            <a href={`/product/DetailOder?maDH=${dh.idOrder}`} className="view">
                                See
                            </a>
                        </td>
                        <td>
                            {dh.status === '1' && (
                                <a href={`/product/DetailOder?maDH=${dh.idOrder}`} className="view">
                                    Confirm
                                </a>
                            )}
                            {dh.status === '0' && (
                                <a href={`/product/DetailOder?maDH=${dh.idOrder}`} style={{ backgroundColor: "red" }} className="view">
                                    Cancel
                                </a>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody> */}
        </table>
    </div>
</div>

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