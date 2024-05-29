import React from "react";
import { NavLink } from "react-router-dom";
import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import envelopeIcon from "../images/envelope-outline.svg";

export default function Footer() {
  return (
    <div>
      <footer className="footer-section">
        <div className="container relative">

          <div className="row">
            <div className="col-lg-8">
              <div className="subscription-form">
                <h3 className="d-flex align-items-center"><span className="me-1"><img src={envelopeIcon} alt="Image" className="img-fluid" /></span><span>Đăng ký để nhận thông tin sản phẩm mới</span></h3>

                <form action="#" className="row g-3">
                  <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Nhập tên của bạn" />
                  </div>
                  <div className="col-auto">
                    <input type="email" className="form-control" placeholder="Nhập email của bạn" />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-primary">
                    <FaPaperPlane />
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-lg-4">
              <div className="mb-4 footer-logo-wrap"><NavLink to="/" className="footer-logo">N.A<span>.</span></NavLink></div>
              <p className="mb-4">Cửa hàng của chúng tôi luôn cung cấp đến khách hàng những mẫu mã mới và tốt nhất nên bạn hãy yên tâm mua sắm tại đây nhé.</p>

              <ul className="list-unstyled custom-social">
              <li><a href="#"><FaFacebookF /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaLinkedinIn /></a></li>
              </ul>
            </div>

            <div className="col-lg-8">
              <div className="row links-wrap">
                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><NavLink to="/home">Trang chủ</NavLink></li>
                    <li><NavLink to="/product">Sản phẩm</NavLink></li>
                    <li><NavLink to="/contact">Liên hệ</NavLink></li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><a href="#">Ba lô nam</a></li>
                    <li><a href="#">Ba lô nữ</a></li>
                    <li><a href="#">Thời trang trẻ em</a></li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><a href="#">Chăm sóc thú cưng</a></li>
                    <li><a href="#">Thể thao và du lịch</a></li>
                    <li><a href="#">Ba lô laptop</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="border-top copyright">
            <div className="row pt-4">
              <div className="col-lg-6">
                <p className="mb-2 text-center text-lg-start">Copyright &copy;<script>document.write(new Date().getFullYear());</script>.
                  All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a>  Distributed By <a href="https://themewagon.com">ThemeWagon</a>
                </p>
              </div>

              <div className="col-lg-6 text-center text-lg-end">
                <ul className="list-unstyled d-inline-flex ms-auto">
                  <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}