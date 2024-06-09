import React, { useState } from 'react';
import '../../css/userManage.css';
import Topbar from '../../Component/admin/Topbar'
import Sidebar from '../../Component/admin/Sidebar'

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '' });

  const handleAddUser = () => {
    setCurrentUser({ id: null, name: '', email: '' });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (currentUser.id) {
      // Edit user logic
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    } else {
      // Add user logic
      setCurrentUser({ ...currentUser, id: users.length + 1 });
      setUsers([...users, { ...currentUser, id: users.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
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
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
                    name="name"
                    value={currentUser.name}
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
