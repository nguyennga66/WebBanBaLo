import React from 'react';
import Sidebar from '../../Component/admin/Sidebar';
import Dashboard from '../../Component/admin/Dashboard';
import Footer from '../../Component/admin/Footer';

function Admin() {
  return (
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
      <div id="page-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col">
            <Dashboard />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
