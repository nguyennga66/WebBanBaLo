import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/userManage.css';
import Sidebar from '../../Component/admin/Sidebar';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null, fullName: '', email: '', phone: '', address: '', role: '', status: '', password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prevUser => ({
      ...prevUser,
      [name]: value.trim() // Ensure trimming whitespace
    }));

    // Validate field when user types
    validateField(name, value.trim());
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value.trim());

    // Validate confirmPassword when user types
    validateField('confirmPassword', e.target.value.trim());
  };

  const validateField = (fieldName, value) => {
    let errors = { ...formErrors };

    switch (fieldName) {
      case 'email':
        errors.email = !value ? 'Email không được để trống' : (isValidEmail(value) ? '' : 'Email không hợp lệ');
        break;
      case 'phone':
        errors.phone = !value ? 'Số điện thoại không được để trống' : (isValidPhoneNumber(value) ? '' : 'Số điện thoại không hợp lệ');
        break;
      case 'password':
        errors.password = value.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự' : '';
        break;
      case 'confirmPassword':
        errors.confirmPassword = value !== currentUser.password ? 'Mật khẩu nhập lại không khớp' : '';
        break;
      case 'fullName':
        errors.fullName = !value ? 'Họ và tên không được để trống' : '';
        break;
      case 'role':
        errors.role = !value ? 'Quyền không được để trống' : '';
        break;
      case 'status':
        errors.status = !value ? 'Trạng thái không được để trống' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const isValidEmail = (email) => {
    // Implement email validation logic here (regex or other checks)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Implement phone number validation logic here (regex or other checks)
    return /^[0-9]{10}$/.test(phone);
  };

  const handleSaveUser = async () => {
    try {
      // Validate entire form before saving
      validateForm();

      // Check if there are any errors in formErrors
      if (Object.keys(formErrors).length > 0) {
        console.error('Form has errors:', formErrors);
        return;
      }

      if (currentUser.id) {
        await axios.put(`http://localhost:8080/users/admin/${currentUser.id}`, currentUser);
        await fetchUsers();
      } else {
        await axios.post('http://localhost:8080/signup', currentUser);
        await fetchUsers();
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  const validateForm = () => {
    let errors = {};

    // Validate each field in currentUser
    Object.keys(currentUser).forEach(field => {
      validateField(field, currentUser[field].trim());
    });

    setFormErrors(errors);
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
        return 'Bị vô hiệu hoá';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="container mt-4">
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
                        <div className="form-group">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            name="fullName"
                            value={currentUser.fullName}
                            onChange={handleChange}
                            onBlur={() => validateField('fullName', currentUser.fullName.trim())}
                            required
                          />
                          {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                            onBlur={() => validateField('email', currentUser.email.trim())}
                            required
                          />
                          {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            name="phone"
                            value={currentUser.phone}
                            onChange={handleChange}
                            onBlur={() => validateField('phone', currentUser.phone.trim())}
                            required
                          />
                          {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                        </div>
                        <div className="form-group">
                          <label>Địa chỉ</label>
                          <input
                            type="text"
                            name="address"
                            value={currentUser.address}
                            onChange={handleChange}
                            onBlur={() => validateField('address', currentUser.address.trim())}
                            required
                          />
                          {formErrors.address && <span className="error">{formErrors.address}</span>}
                        </div>
                        <div className="form-group">
                          <label>Quyền</label>
                          <input
                            type="text"
                            name="role"
                            value={currentUser.role}
                            onChange={handleChange}
                            onBlur={() => validateField('role', currentUser.role.trim())}
                            required
                          />
                          {formErrors.role && <span className="error">{formErrors.role}</span>}
                        </div>
                        <div className="form-group">
                          <label>Trạng thái</label>
                            <select
                              name="status"
                              value={currentUser.status}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Chọn trạng thái</option>
                              <option value="0">Đang hoạt động</option>
                              <option value="1">Vô hiệu hóa</option>
                            </select>
                            {formErrors.status && <span className="error">{formErrors.status}</span>}
                          </div>
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
  