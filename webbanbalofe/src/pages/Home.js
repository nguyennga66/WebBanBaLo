import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus, FaPlus, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { FaTruck, FaShoppingBag, FaHeadset, FaUndo } from 'react-icons/fa';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import Testimonial from '../Component/Testimonial'

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
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
                </p>
                <p>
                  <a href="" className="btn btn-secondary me-2">
                    Sản phẩm
                  </a>
                  <a href="#" className="btn btn-white-outline">
                    Explore
                  </a>
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
              <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <p>
                <NavLink to="/product" className="btn">
                  Explore
                </NavLink>
              </p>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/cart">
                <img src={require("../images/product-1.png")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </NavLink>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/product_page">
              <img src={require("../images/product-2.png")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Kruzo Aero Chair</h3>
                <strong className="product-price">$78.00</strong>
                
                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
               </NavLink>            
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <NavLink className="product-item" to="/cart">
              <img src={require("../images/product-3.png")} className="img-fluid product-thumbnail" alt="" />
                <h3 className="product-title">Ergonomic Chair</h3>
                <strong className="product-price">$43.00</strong>

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
                        <h2 className="section-title">Tại sao nên chọp chúng tôi?</h2>
                        <p>
                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
                        </p>

                        <div className="row my-5">
                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaTruck className="icon" />
                                    </div>
                                    <h3>Nhanh &amp; Miễn phí giao hàng</h3>
                                    <p>
                                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.
                                    </p>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaShoppingBag className="icon" />
                                    </div>
                                    <h3>Dễ dàng mua sắm</h3>
                                    <p>
                                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.
                                    </p>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaHeadset className="icon" />
                                    </div>
                                    <h3>Hỗ trợ 24/7</h3>
                                    <p>
                                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.
                                    </p>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className="feature">
                                    <div className="icon">
                                        <FaUndo className="icon" />
                                    </div>
                                    <h3>Trả hàng dễ dàng</h3>
                                    <p>
                                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.
                                    </p>
                                </div>
                            </div>
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
                  <img src={require("../images/img-grid-1.jpg")} alt="Untree.co" />
                </div>
                <div className="grid grid-2">
                <img src={require("../images/img-grid-2.jpg")} alt="Untree.co" />
                </div>
                <div className="grid grid-3">
                <img src={require("../images/img-grid-3.jpg")} alt="Untree.co" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 ps-lg-5">
              <h2 className="section-title mb-4">Chúng tôi giúp bạn lựa chọn được những chiếc ba lô hợp thời đại</h2>
              <p>
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              </p>

              <ul className="list-unstyled custom-list my-4">
                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                <li>Donec vitae odio quis nisl dapibus malesuada</li>
              </ul>
              <p>
                <a href="#" className="btn">
                  Explore
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="popular-product">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail">
                  <img src={require("../images/product-1.png")} alt="Image" className="img-fluid" />
                </div>
                <div className="pt-3">
                  <h3>Nordic Chair</h3>
                  <p>
                    Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                  </p>
                  <p>
                    <a href="#">Read More</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail">
                <img src={require("../images/product-2.png")} alt="Image" className="img-fluid" />
                </div>
                <div className="pt-3">
                  <h3>Kruzo Aero Chair</h3>
                  <p>
                    Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                  </p>
                  <p>
                    <a href="#">Read More</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail">
                <img src={require("../images/product-3.png")} alt="Image" className="img-fluid" />
                </div>
                <div className="pt-3">
                  <h3>Ergonomic Chair</h3>
                  <p>
                    Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                  </p>
                  <p>
                    <a href="#">Read More</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonial />

      <div className="blog-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="section-title">Recent Blog</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <a href="#" className="more">
                View All Posts
              </a>
            </div>
          </div>

          <div className="row">

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div className="post-entry">
                <a href="#" className="post-thumbnail"><img src={require("../images/post-1.jpg")} alt="Image" className="img-fluid" /></a>
                <div className="post-content-entry">
                  <h3><a href="#">First Time Home Owner Ideas</a></h3>
                  <div className="meta">
                    <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div className="post-entry">
                <a href="#" className="post-thumbnail"><img src={require("../images/post-2.jpg")} alt="Image" className="img-fluid" /></a>
                <div className="post-content-entry">
                  <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
                  <div className="meta">
                    <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div className="post-entry">
                <a href="#" className="post-thumbnail"><img src={require("../images/post-3.jpg")} alt="Image" className="img-fluid" /></a>
                <div className="post-content-entry">
                  <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
                  <div className="meta">
                    <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
