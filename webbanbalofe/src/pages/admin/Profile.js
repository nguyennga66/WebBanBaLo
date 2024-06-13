import React from 'react';
import Topbar from '../../Component/admin/Topbar'
import Sidebar from '../../Component/admin/Sidebar'
import "../../css/style.css"

const Profile = () => {
  return (
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
      <Topbar />
      <div id="page-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col">
        <div className="page-wrapper">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-xlg-3 col-md-12">
          <div className="white-box">
            <div className="user-bg">
              <img width="100%" alt="user" src="plugins/images/large/img1.jpg" />
              <div className="overlay-box">
                <div className="user-content">
                  <a href="javascript:void(0)">
                    <img src="plugins/images/users/genu.jpg" className="thumb-lg img-circle" alt="img" />
                  </a>
                  <h4 className="text-white mt-2">Họ và tên</h4>
                  <h5 className="text-white mt-2">Nguyễn Văn A</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-xlg-9 col-md-12">
          <div className="card">
            <div className="card-body">
              <form className="form-horizontal form-material">
                <div className="form-group mb-4">
                  <label className="col-md-12 p-0">Họ và tên</label>
                  <div className="col-md-12 border-bottom p-0">
                    <input type="text" placeholder="Johnathan Doe" className="form-control p-0 border-0" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="example-email" className="col-md-12 p-0">Email</label>
                  <div className="col-md-12 border-bottom p-0">
                    <input type="email" placeholder="johnathan@admin.com" className="form-control p-0 border-0" name="example-email" id="example-email" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="col-md-12 p-0">Mật khẩu</label>
                  <div className="col-md-12 border-bottom p-0">
                    <input type="password" value="password" className="form-control p-0 border-0" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="col-md-12 p-0">Số điện thoại</label>
                  <div className="col-md-12 border-bottom p-0">
                    <input type="text" placeholder="123 456 7890" className="form-control p-0 border-0" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="col-md-12 p-0">Lời nhắn</label>
                  <div className="col-md-12 border-bottom p-0">
                    <textarea rows="5" className="form-control p-0 border-0"></textarea>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="col-sm-12">
                    <button className="btn btn-success">Cập nhật</button>
                  </div>
                </div>
              </form>
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
};

export default Profile;
