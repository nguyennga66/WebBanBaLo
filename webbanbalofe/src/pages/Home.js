import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus, FaPlus, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { FaTruck, FaShoppingBag, FaHeadset, FaUndo } from 'react-icons/fa';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function Home() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>
                  Thế Giới <span className="d-block">Ba Lô</span>
                </h1>
                <p className="mb-4">
                 Chào mừng bạn đến với cửa hàng ba lô của chúng tôi. Tại đây bạn có thể tìm thấy những mẫu mã ba lô mới nhất và sành điệu nhất.
                </p>
                <p>
                  <NavLink to="/product" className="btn btn-secondary me-2">
                    Sản phẩm
                  </NavLink>
                  <NavLink to="/product" className="btn btn-white-outline">
                    Khám phá
                  </NavLink>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={require("../images/couch.png")} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">Cung cấp ba lô với nhiều chất liệu</h2>
              <p className="mb-4">
                Ba lô có nhiều chất liệu như vải bố, canvas, nhựa và nhiều chất liệu khác được cửa hàng của chúng tôi cung cấp đầy đủ.
              </p>
              <p>
                <NavLink to="/product" className="btn">
                  Khám phá
                </NavLink>
              </p>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/product_page/1">
                <img src={require("../images/product/balonam1.png")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Balo laptop thời trang unisex PADO 604 thiết kế chống thấm cao cấp, chứa được laptop 15.6 inch</h3>
                <strong className="product-price">300.000 VNĐ</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </NavLink>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/product_page/6">
              <img src={require("../images/product/balothucung1.jpg")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Ba Lô Đi Học Hình Rùa / Thỏ / Rùa Hoạt Hình Nhồi Bông Dễ Thương Cho Nữ</h3>
                <strong className="product-price">350.000 VNĐ</strong>
                
                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
               </NavLink>            
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/product_page/16">
              <img src={require("../images/product/balottdl1.jpg")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Balo chạy bộ vest running trail Aonijie C9102 Free Size</h3>
                <strong className="product-price">800.000 VNĐ</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="why-choose-section">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-6">
                        <h2 className="section-title">Tại sao nên chọn chúng tôi?</h2>
                        
                        <div className="row my-5">
                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaTruck className="icon" />
                                    </div>
                                    <h3>Nhanh &amp; Miễn phí giao hàng</h3>
                                    
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaShoppingBag className="icon" />
                                    </div>
                                    <h3>Dễ dàng mua sắm</h3>
                                    
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaHeadset className="icon" />
                                    </div>
                                    <h3>Hỗ trợ 24/7</h3>
                                    
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaUndo className="icon" />
                                    </div>
                                    <h3>Trả hàng dễ dàng, nhanh chóng</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
						<div class="img-wrap">
							<img src={require("../images/product/balonu3.jpg")} alt="Image" class="img-fluid"/>
						</div>
					</div>

                </div>
            </div>
        </div>

      <div className="we-help-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="imgs-grid">
                <div className="grid grid-1">
                  <img src={require("../images/product/balolaptop2.jpg")} alt="Untree.co" />
                </div>
                <div className="grid grid-2">
                <img src={require("../images/product/balonu1.jpg")} alt="Untree.co" />
                </div>
                <div className="grid grid-3">
                <img src={require("../images/product/balothucung2.jpg")} alt="Untree.co" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 ps-lg-5">
              <h2 className="section-title mb-4">Chúng tôi giúp bạn lựa chọn được những chiếc ba lô hợp thời đại</h2>
              <p>
                Hãy đến với cửa hàng của chúng tôi.
              </p>
              <p>
                <NavLink to="/product" className="btn">
                  Khám phá
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
