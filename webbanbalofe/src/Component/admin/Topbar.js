import React from 'react';
import { NavLink } from "react-router-dom";
import "../../css/admin.css"
import "../../plugins/bower_components/chartist/dist/chartist.min.css"
import "../../plugins/bower_components/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css"

const Topbar = () => {
  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header" data-logobg="skin6">
          <NavLink className="navbar-brand" to="/dashboard">
            <b className="logo-icon">
              <img src="plugins/images/logo-icon.png" alt="homepage" />
            </b>
            <span className="logo-text">
              <img src="plugins/images/logo-text.png" alt="homepage" />
            </span>
          </NavLink>
          <NavLink className="nav-toggler waves-effect waves-light text-dark d-block d-md-none" href="javascript:void(0)">
            <i className="ti-menu ti-close"></i>
          </NavLink>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
          <ul className="navbar-nav d-none d-md-block d-lg-none">
            <li className="nav-item">
              <NavLink className="nav-toggler nav-link waves-effect waves-light text-white" href="javascript:void(0)">
                <i className="ti-menu ti-close"></i>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="d-flex align-items-center">
              <form role="search" className="app-search d-none d-md-block me-3">
                <div className="position-relative">
                  <input type="text" placeholder="Tìm kiếm..." className="form-control mt-0" />
                  <NavLink to="#" className="active search-icon">
                    <i className="fa fa-search"></i>
                  </NavLink>
                </div>
              </form>
            </li>
            <li className="d-flex align-items-center">
              <NavLink className="profile-pic d-flex align-items-center text-decoration-none text-dark" to="#">
                <img src={require("../../plugins/images/users/varun.jpg")} alt="user-img" width="36" height="36" className="img-circle rounded-circle me-2" />
                <span className="font-medium">Steave</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;