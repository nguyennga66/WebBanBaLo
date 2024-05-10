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
    const [quantity, setQuantity] = useState(1); // Mặc định số lượng là 1
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setIsLoggedIn(true);
          setUserId(user.id);
          console.log("useEffect is called");
    
        }
    
      }, []);

    const handleQuantityChange = (event) => {
        const quantityValue = parseInt(event.target.value);
        setQuantity(quantityValue > 0 ? quantityValue : 1); // Số lượng không được nhỏ hơn 1
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            // Nếu đã đăng nhập, chuyển hướng đến trang giỏ hàng
            window.location.href = `/cart/${userId}`;
        } else {
            // Nếu chưa đăng nhập, hiển thị trang đăng nhập
            window.location.href = '/login'; // Thay đổi '/login' thành đường dẫn tới trang đăng nhập của bạn
        }
        const cartItem = {
           cart: { user: { id: userId } }, // Sử dụng ID của người dùng đăng nhập
        product: { id: product.id },
        quantity: quantity
        };

        fetch('http://localhost:8080/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu:', error);
            alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
        });
    };

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
                                <h3 className="product-title1" style={{ textAlign: 'left' }}>{product.nameP}</h3>
                                <p className="product-description" style={{ textAlign: 'left' }}>{product.description}</p>
                                <h4 className="price" style={{ textAlign: 'left' }}>Giá: <span>{product.price}.000 VNĐ</span></h4>
                                <p className="vote" style={{ textAlign: 'left' }}><strong>100%</strong> hàng <strong>Chất lượng</strong>, đảm bảo <strong>Uy tín</strong>!</p>
                                <div className="form-group" style={{ textAlign: 'left' }}>
                                    <label htmlFor="quantity">Số lượng đặt mua:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                                <br />
                                <div className="action" style={{ textAlign: 'left' }}>
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
