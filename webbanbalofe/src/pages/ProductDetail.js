import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/product-detail.css"
import { FaHeart } from 'react-icons/fa';

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(0);
    
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        // Thêm xử lý logic cho sự kiện thêm vào giỏ hàng
        console.log("Đã thêm vào giỏ hàng:", quantity);
    };

    return (
        <div>
            <div className="container mt-4">
                <div id="thongbao" className="alert alert-danger d-none face" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <div className="card">
                    <div className="container-fluid">
                        <form name="frmsanphamchitiet" id="frmsanphamchitiet" method="post" action="/php/twig/frontend/giohang/themvaogiohang">
                            <input type="hidden" name="sp_ma" id="sp_ma" value="5" />
                            <input type="hidden" name="sp_ten" id="sp_ten" value="Samsung Galaxy Tab 10.1 3G 16G" />
                            <input type="hidden" name="sp_gia" id="sp_gia" value="10990000.00" />
                            <input type="hidden" name="hinhdaidien" id="hinhdaidien" value="samsung-galaxy-tab-10.jpg" />

                            <div className="wrapper row">
                                <div className="preview col-md-6">
                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane" id="pic-1">
                                            <img src="../assets/img/product/samsung-galaxy-tab-10.jpg" alt="Product" />
                                        </div>
                                        <div className="tab-pane" id="pic-2">
                                            <img src="../assets/img/product/samsung-galaxy-tab.jpg" alt="Product" />
                                        </div>
                                        <div className="tab-pane active" id="pic-3">
                                            <img src="../assets/img/product/samsung-galaxy-tab-4.jpg" alt="Product" />
                                        </div>
                                    </div>
                                    <ul className="preview-thumbnail nav nav-tabs">
                                        <li className="active">
                                            <a data-target="#pic-1" data-toggle="tab">
                                                <img src="../assets/img/product/samsung-galaxy-tab-10.jpg" alt="Thumbnail" />
                                            </a>
                                        </li>
                                        <li>
                                            <a data-target="#pic-2" data-toggle="tab">
                                                <img src="../assets/img/product/samsung-galaxy-tab.jpg" alt="Thumbnail" />
                                            </a>
                                        </li>
                                        <li>
                                            <a data-target="#pic-3" data-toggle="tab" className="active">
                                                <img src="../assets/img/product/samsung-galaxy-tab-4.jpg" alt="Thumbnail" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="details col-md-6">
                                    <h3 className="product-title">Ba lô </h3>
                                    <p className="product-description">Phù hợp với mọi lứa tuổi</p>
                                    <h4 className="price">Giá: <span>245.000 vnđ</span></h4>
                                    <p className="vote"><strong>100%</strong> hàng <strong>Chất lượng</strong>, đảm bảo <strong>Uy tín</strong>!</p>
                                    <div className="form-group">
                                        <label htmlFor="soluong">Số lượng đặt mua:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="soluong"
                                            name="soluong"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                        />
                                    </div>
                                    <br/>
                                    <div className="action">
                                        <button type="button" className="add-to-cart btn btn-default" onClick={handleAddToCart}>
                                            Thêm vào giỏ hàng
                                        </button>
                                        <a className="like btn btn-default" href="#">
                                        <FaHeart />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card">
                    <div className="container-fluid">
                        <h3>Thông tin chi tiết về Sản phẩm</h3>
                        <div className="row">
                            <div className="col">
                                Kích thước : 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
