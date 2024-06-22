import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormEditProfile from '../Component/FormEditProfile';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/information.css";
import Footer from '../Component/Footer'
import Header from '../Component/Header'

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
    const [passwordErrors, setPasswordErrors] = useState({});
    const { userId } = useParams();

    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const pageSize = 10;
    const [favoriteProducts, setFavoriteProducts] = useState([]);
  
    useEffect(() => {
       // Gọi API để lấy danh sách hóa đơn của người dùng với phân trang
       axios.get(`http://localhost:8080/bills/user/${userId}?page=${currentPage}&size=${pageSize}`)
       .then((response) => {
         setOrderList(response.data.content);
         setTotalPages(response.data.totalPages);
       })
       .catch((error) => {
         console.error("Lỗi khi gọi API để lấy danh sách hóa đơn:", error);
       });
   }, [currentPage, userId]);

  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handleViewDetails = (orderId) => {
      // Gọi API để lấy thông tin chi tiết hóa đơn từ backend
      axios.get(`http://localhost:8080/bills/${orderId}`)
        .then((response) => {
          setSelectedOrder(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API để lấy thông tin hóa đơn:", error);
        });
    };

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

    const validateOldPassword = async (value) => {
        if (!value) {
            return "Mật khẩu cũ không được để trống";
        }
        try {
            const response = await axios.put(`http://localhost:8080/users/pass/${userId}`, { oldPassword: value, newPassword: newPassword});
            if (response.status !== 200) {
                return "Mật khẩu cũ không đúng";
            }
        } catch (error) {
            console.error('Error verifying old password:', error);
            return "Mật khẩu cũ không đúng";
        }
        return null;
    };

    const validateNewPassword = (value) => {
        if (!value) {
            return "Mật khẩu mới không được để trống";
        } else if (value.length < 6) {
            return "Mật khẩu mới phải có ít nhất 6 ký tự";
        }
        return null;
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            return "Xác nhận mật khẩu mới không được để trống";
        } else if (value !== newPassword) {
            return "Mật khẩu xác nhận không khớp";
        }
        return null;
    };

    const handleOldPasswordChange = async (e) => {
        const value = e.target.value;
        setOldPassword(value);
        const error = await validateOldPassword(value);
        setPasswordErrors(prevErrors => ({ ...prevErrors, oldPassword: error }));
    };

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        const error = validateNewPassword(value);
        setPasswordErrors(prevErrors => ({ ...prevErrors, newPassword: error }));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        const error = validateConfirmPassword(value);
        setPasswordErrors(prevErrors => ({ ...prevErrors, confirmPassword: error }));
    };

    const handlePasswordChange = async () => {
        const oldPasswordError = await validateOldPassword(oldPassword);
        const newPasswordError = validateNewPassword(newPassword);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);

        const errors = {
            oldPassword: oldPasswordError,
            newPassword: newPasswordError,
            confirmPassword: confirmPasswordError,
        };

        if (Object.values(errors).some(error => error !== null)) {
            setPasswordErrors(errors);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/users/pass/${userId}`, {
                oldPassword,
                newPassword,
            });
            if (response.status === 200) {
                setPasswordChangeMessage('Mật khẩu đã được thay đổi thành công');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordErrors({});
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordChangeMessage('Có lỗi xảy ra khi thay đổi mật khẩu');
        }
    };

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/favorites/${userId}`);
                setFavoriteProducts(response.data);
            } catch (error) {
                console.error('Error fetching favorite products:', error);
            }
        };

        fetchFavoriteProducts();
    }, [userId]);
    
    return (
        <div>
            <Header />
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
                                            <li className={`nav-item ${tab === 'favorite' ? 'active' : ''}`}>
                                                <NavLink className="nav-link" onClick={() => setTab('favorite')}>Sản phẩm yêu thích</NavLink>
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
                                                        <div className="p-3 p-lg-5 border bg-white">
                                                            <table className="table">
                                                            <thead>
                                                                <tr>
                                                                <th>ID Hóa đơn</th>
                                                                <th>Họ và tên</th>
                                                                <th>Địa chỉ</th>
                                                                <th>Email</th>
                                                                <th>Số điện thoại</th>
                                                                <th>Tổng tiền</th>
                                                                <th>Ngày tạo</th>
                                                                <th>Chi tiết</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orderList.map((order) => (
                                                                <tr key={order.id}>
                                                                    <td>{order.id}</td>
                                                                    <td>{order.fullName}</td>
                                                                    <td>{order.address}</td>
                                                                    <td>{order.email}</td>
                                                                    <td>{order.phone}</td>
                                                                    <td>{order.grandTotal.toLocaleString('vi-VN')}.000 VNĐ</td>
                                                                    <td>{order.createDate}</td>
                                                                    <td>
                                                                    <button
                                                                        onClick={() => handleViewDetails(order.id)}
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Xem chi tiết
                                                                    </button>
                                                                    </td>
                                                                </tr>
                                                                ))}
                                                            </tbody>
                                                            </table>
                                                            <div className="pagination">
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={handlePreviousPage}
                                                                disabled={currentPage === 0}
                                                            >
                                                                Trước
                                                            </button>
                                                            {Array.from(Array(totalPages).keys()).map((page) => (
                                                                <button
                                                                key={page}
                                                                className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
                                                                onClick={() => handlePageChange(page)}
                                                                >
                                                                {page + 1}
                                                                </button>
                                                            ))}
                                                            <button
                                                                className="btn btn-secondary"
                                                                onClick={handleNextPage}
                                                                disabled={currentPage === totalPages - 1}
                                                            >
                                                                Tiếp
                                                            </button>
                                                            </div>
                                                        </div>
                                                        {selectedOrder && (
                                                            <div className="mt-5 p-3 p-lg-5 border bg-white">
                                                            <h2 className="h3 mb-3 text-black">Chi tiết hóa đơn</h2>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                <h4>Thông tin khách hàng</h4>
                                                                <p>Họ và tên: {selectedOrder.fullName}</p>
                                                                <p>Địa chỉ: {selectedOrder.address}</p>
                                                                <p>Email: {selectedOrder.email}</p>
                                                                <p>Số điện thoại: {selectedOrder.phone}</p>
                                                                <p>Ghi chú: {selectedOrder.orderNotes}</p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                <h4>Thông tin hóa đơn</h4>
                                                                <p>Tổng tiền hàng: {selectedOrder.total.toLocaleString('vi-VN')}.000 VNĐ</p>
                                                                <p>Phí vận chuyển: {selectedOrder.shippingFee.toLocaleString('vi-VN')}.000 VNĐ</p>
                                                                <p>Tổng thanh toán: {selectedOrder.grandTotal.toLocaleString('vi-VN')}.000 VNĐ</p>
                                                                </div>
                                                            </div>

                                                            <h4 className="mt-4">Danh sách sản phẩm</h4>
                                                            <table className="table">
                                                                <thead>
                                                                <tr>
                                                                    <th>Sản phẩm</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Giá</th>
                                                                    <th>Tổng</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {selectedOrder.billDetails.map((detail, index) => (
                                                                    <tr key={index}>
                                                                    <td>{detail.product.nameP}</td>
                                                                    <td>{detail.quantity}</td>
                                                                    <td>{detail.product.price.toLocaleString('vi-VN')}.000 VNĐ</td>
                                                                    <td>{(detail.product.price * detail.quantity).toLocaleString('vi-VN')}.000 VNĐ</td>
                                                                    </tr>
                                                                ))}
                                                                </tbody>
                                                            </table>
                                                            </div>
                                                        )}
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
                                            onChange={handleOldPasswordChange}
                                        />
                                        {passwordErrors.oldPassword && <small className="text-danger">{passwordErrors.oldPassword}</small>}
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'left' }}>
                                        <label htmlFor="newPassword">Mật khẩu mới</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                        />
                                        {passwordErrors.newPassword && <small className="text-danger">{passwordErrors.newPassword}</small>}
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'left' }}>
                                        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        {passwordErrors.confirmPassword && <small className="text-danger">{passwordErrors.confirmPassword}</small>}
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
           {tab === 'favorite' && (
  <div className="card mt-4">
    <div className="card-body">
      <h3 className="card-title mb-4">Sản phẩm yêu thích</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {favoriteProducts.map((product) => (
              <tr key={product.product.id}>
                <td className="align-middle text-center">
                  <img
                    src={require(`../images/product/${product.product.image}`)}
                    className="img-fluid"
                    alt={product.product.nameP}
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td className="align-middle">{product.product.nameP}</td>
                <td className="align-middle">{product.product.price}.000 VNĐ</td>
                <td className="align-middle text-center">
                  <NavLink to={`/product_page/${product.product.id}`} className="btn btn-primary">
                    Chi tiết
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <Footer />
        </div>
    );
}