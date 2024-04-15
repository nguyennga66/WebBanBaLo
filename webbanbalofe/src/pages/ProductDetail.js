import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/product-detail.css";
import { FaHeart } from 'react-icons/fa';

export default function ProductDetail() {
    const { id } = useParams();
console.log('ID sản phẩm từ URL:', id);

    const [product, setProduct] = useState(null); // Trạng thái để lưu trữ thông tin chi tiết của sản phẩm
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        // Thêm logic xử lý cho sự kiện thêm vào giỏ hàng
        console.log("Đã thêm vào giỏ hàng:", quantity);
    };

    useEffect(() => {
        // Gọi API để lấy thông tin chi tiết sản phẩm dựa trên ID từ URL
        fetch(`http://localhost:8080/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API để lấy chi tiết sản phẩm:', error);
            });
    }, [id]);

    // Nếu chưa có dữ liệu sản phẩm, có thể hiển thị trạng thái loading hoặc thông báo lỗi
    if (!product) {
        return <div>Đang tải thông tin sản phẩm...</div>;
    }

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
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1">
                                        <img src={require(`../images/product/${product.image}`)} alt="Product" style={{ width: '350px',height: '310px'}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title1">{product.nameP}</h3>
                                <p className="product-description">{product.description}</p>
                                <h4 className="price">Giá: <span>{product.price}.000 VNĐ</span></h4>
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
                                <br />
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
                    </div>
                </div>
            </div>
        </div>
    );
}
