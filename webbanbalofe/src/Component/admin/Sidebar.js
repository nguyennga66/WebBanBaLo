import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../../css/admin.css";
import "../../plugins/bower_components/chartist/dist/chartist.min.css";
import "../../plugins/bower_components/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";

function Sidebar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item pt-2">
              <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/admin" aria-expanded="false">
                <i className="fa fa-tachometer-alt" aria-hidden="true"></i>
                <span className="hide-menu">Bảng điều khiển</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/profile" aria-expanded="false">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span className="hide-menu">Trang cá nhân</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <div
                className="sidebar-link waves-effect waves-dark sidebar-link"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                <i className="fa fa-table" aria-hidden="true"></i>
                <span className="drop-down">Quản lý</span>
                <i className="fa fa-angle-down" aria-hidden="true"></i> {/* Icon mũi tên xuống */}
              </div>
              {isDropdownVisible && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/manage/users">Quản lý người dùng</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage/products">Quản lý sản phẩm</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage/orders">Quản lý đơn hàng</NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
export default Sidebar;
