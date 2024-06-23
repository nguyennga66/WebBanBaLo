import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../../css/admin.css";
import "../../plugins/bower_components/chartist/dist/chartist.min.css";
import "../../plugins/bower_components/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";
import "../../css/bootstrap.min.css";
import "../../css/tiny-slider.css";
import "../../css/style.css";
import defaultAvatar from '../../images/admin/users/d3.jpg';

function Sidebar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-profile">
            {user && (
              <>
                <img
                  src={defaultAvatar}
                  alt="Avatar"
                  className="avatar"
                />
                <div className="profile-info">
                  <p>{user.fullName}</p>
                </div>
              </>
            )}
          </div>
          <ul id="sidebarnav">
          <li className="sidebar-item">
              <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/" aria-expanded="false">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span className="hide-menu">Trang mua hàng</span>
              </NavLink>
            </li>
            <li className="sidebar-item pt-2">
              <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin" aria-expanded="false">
                <i className="fa fa-cloud" aria-hidden="true"></i>
                <span className="hide-menu">Bảng điều khiển</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <i className="fa fa-table" aria-hidden="true"></i>
                <span className="hide-menu">Quản lý</span>
              
              {isDropdownVisible && (
                <ul className="dropdown-content">
                  <NavLink to="/user_manage">Người dùng</NavLink>
                  <NavLink to="/product_manage">Sản phẩm</NavLink>
                  <NavLink to="/category_manage">Loại sản phẩm</NavLink>
                  <NavLink to="/order_list">Đơn hàng</NavLink>
                </ul>
              )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
