import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/userManage.css';
import Topbar from '../../Component/admin/Topbar';
import Sidebar from '../../Component/admin/Sidebar';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null, fullName: '', email: '', phone: '', address: '', role: '', status: '', password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users'); 
      setUsers(response.data.content); 
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleAddUser = () => {
    setCurrentUser({ id: '', fullName: '', email: '', phone: '', address: '', role: '', status: '', password: '' });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSaveUser = async () => {
    try {
      if (currentUser.id) {
        await axios.put(`http://localhost:8080/users/admin/${currentUser.id}`, currentUser);
        await fetchUsers();
      } else {
        if (currentUser.password !== confirmPassword) {
          alert('Mật khẩu nhập lại không khớp!');
          return;
        }
        await axios.post('http://localhost:8080/signup', currentUser);
        await fetchUsers();
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getRoleDisplay = (role) => {
    switch(role) {
      case 1:
        return 'Quản trị viên';
      case 0:
        return 'Người dùng';
      default:
        return 'Không xác định';
    }
  };

  const getStatusDisplay = (status) => {
    switch(status) {
      case 0:
        return 'Đang hoạt động';
      case 1:
        return 'Không hoạt động';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="container mt-4">
      <Topbar />
      <div id="page-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col">
            <div className="page-wrapper">
              <h2 style={{ textAlign: 'left' }}>Quản lý người dùng</h2>
              <button className="btn btn-primary" onClick={handleAddUser}>Thêm</button>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Quyền</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{getRoleDisplay(user.role)}</td>
                      <td>{getStatusDisplay(user.status)}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleEditUser(user)}>Sửa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                      <h2>{currentUser.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</h2>
                    </div>
                    <div className="modal-body">
                      <form>                      
                        {currentUser.id ? (
                          <div>
                            <div className="form-group">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            name="fullName"
                            value={currentUser.fullName}
                            onChange={handleChange}
                            readOnly = {true}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                            readOnly = {true}
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            name="phone"
                            value={currentUser.phone}
                            onChange={handleChange}
                            readOnly = {true}
                          />
                        </div>
                        <div className="form-group">
                          <label>Địa chỉ</label>
                          <input
                            type="text"
                            name="address"
                            value={currentUser.address}
                            onChange={handleChange}
                            readOnly = {true}
                          />
                        </div>
                            <div className="form-group">
                              <label>Mật khẩu mới</label>
                              <input
                                type="password"
                                name="password"
                                value={currentUser.password}
                                onChange={handleChange}
                                readOnly = {true}
                              />
                            </div>
                            <div className="form-group">
                              <label>Nhập lại mật khẩu</label>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={currentUser.password}
                                onChange={handleConfirmPasswordChange}
                                readOnly = {true}
                              />
                            </div>
                            <div className="form-group">
                          <label>Quyền</label>
                          <select
                            name="role"
                            value={currentUser.role}
                            onChange={handleChange}
                          >
                            <option value="">Chọn quyền</option>
<option value="0">Người dùng</option>
<option value="1">Quản trị viên</option>
</select>
</div>
<div className="form-group">
<label>Trạng thái</label>
<select
                         name="status"
                         value={currentUser.status}
                         onChange={handleChange}
                         readOnly = {true}
                       >
<option value="">Chọn trạng thái</option>
<option value="0">Đang hoạt động</option>
<option value="1">Không hoạt động</option>
</select>
</div>
                          </div>
                        ) : (
                          <div>
                            <div className="form-group">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            name="fullName"
                            value={currentUser.fullName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            name="phone"
                            value={currentUser.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Địa chỉ</label>
                          <input
                            type="text"
                            name="address"
                            value={currentUser.address}
                            onChange={handleChange}
                          />
                        </div>
                            <div className="form-group">
                              <label>Mật khẩu</label>
                              <input
                                type="password"
                                name="password"
                                value={currentUser.password}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Nhập lại mật khẩu mới</label>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                              />
                            </div>
                            <div className="form-group">
                          <label>Quyền</label>
                          <select
                            name="role"
                            value={currentUser.role}
                            onChange={handleChange}
                          >
                            <option value="">Chọn quyền</option>
<option value="0">Người dùng</option>
<option value="1">Quản trị viên</option>
</select>
</div>
<div className="form-group">
<label>Trạng thái</label>
<select
                         name="status"
                         value={currentUser.status}
                         onChange={handleChange}
                       >
<option value="">Chọn trạng thái</option>
<option value="0">Đang hoạt động</option>
<option value="1">Không hoạt động</option>
</select>
</div>
                          </div>
                        )}
                        
</form>
</div>
<div className="modal-footer">
<button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
<button className="btn btn-primary" onClick={handleSaveUser}>Lưu</button>
</div>
</div>
</div>
)}
</div>
</div>
</div>
</div>
</div>
);
}

export default UserManagement;
