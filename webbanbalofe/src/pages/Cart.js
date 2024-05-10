import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    // Gọi API để lấy thông tin giỏ hàng từ backend
    fetch(`http://localhost:8080/carts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Thêm các header cần thiết cho xác thực người dùng nếu cần
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data); // Lưu thông tin giỏ hàng vào state
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API để lấy thông tin giỏ hàng:", error);
      });
  }, [userId]);

  const handleQuantityChange = (event, index) => {
    const inputQuantity = event.target.value;
    const newQuantity = Math.max(1, parseInt(inputQuantity, 10));
  
    const productId = cartItems[index].product.id; // Lấy productId từ cartItem
  
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  
    // Lưu thông tin giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
    // Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
    axios.put(`http://localhost:8080/carts/${userId}/${productId}`, { quantity: newQuantity })
      .then(response => {
        if (response.status !== 200) {
          console.error('Lỗi từ server:', response.data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
      });
  };
  
  const handleRemoveFromCart = (cartItem) => {
    axios.delete(`http://localhost:8080/carts`, {
      data: cartItem // Truyền dữ liệu cartItem trực tiếp qua body của yêu cầu
    })
      .then(response => {
        if (response.status === 200) {
          // Nếu xóa thành công, cập nhật lại danh sách giỏ hàng
          setCartItems(cartItems.filter(item => item.product.id !== cartItem.product.id));
        } else {
          // Nếu có lỗi từ server, hiển thị thông báo lỗi
          console.error('Lỗi từ server:', response.data);
        }
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu hoặc nhận phản hồi
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      });
  };
  
  // Tính tổng giỏ hàng
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return (
    <div>
      {/* Phần tiêu đề của giỏ hàng */}
      <div className="row mb-5" style={{ margin: "20px 20px" }}>
        <div className="col-md-12">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Hình ảnh</th>
                    <th className="product-name">Sản phẩm</th>
                    <th className="product-price">Giá</th>
                    <th className="product-quantity">Số lượng</th>
                    <th className="product-total">Tổng</th>
                    <th className="product-remove">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Hiển thị các sản phẩm trong giỏ hàng */}
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <img
                            src={require(`../images/product/${item.product.image}`)}
                            alt="Image"
                            className="img-fluid"
                          />
                        </td>
                        <td className="product-name">
                        <h2 className="h5 text-black">{item.product.nameP.slice(0, 24)}...</h2>
                        </td>
                        <td>{item.product.price}.000 VNĐ</td>
                        <td>
                        <div className="d-flex align-items-center justify-content-center" style={{ margin: "0 auto", maxWidth: "120px" }}>
                            <input
                              type="number"
                              className="form-control text-center quantity-amount"
                              value={item.quantity}
                              onChange={(event) => handleQuantityChange(event, index)}
                              min="1"
                              aria-label="Quantity input"
                              aria-describedby="button-addon1"
                            />
                          </div>
                        </td>
                        <td>{item.product.price * item.quantity}.000 VNĐ</td>
                        <td><FaTrash onClick={() => handleRemoveFromCart(item)}></FaTrash></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Không có sản phẩm trong giỏ hàng</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
  
      {/* Các nút và thông tin khác */}
      <div className="row" style={{ margin: "20px 20px" }}>
        <div className="col-md-6">
          <div className="row mb-5">
            <div className="col-md-6">
              <button className="btn btn-outline-black btn-sm btn-block">Tiếp tục mua sắm</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" style={{ textAlign: 'left' }}>
              <label className="text-black h4" htmlFor="coupon">Phiếu giảm giá</label>
            </div>
            <div className="col-md-8 mb-3 mb-md-0">
              <input type="text" className="form-control py-3" id="coupon" placeholder="Nhập phiếu giảm giá (nếu có)" />
            </div>
            <div className="col-md-4">
              <button className="btn btn-black">Áp dụng</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 pl-5">
          <div className="row justify-content-end">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12 text-right border-bottom mb-5">
                  <h3 className="text-black h4 text-uppercase">Tổng giỏ hàng</h3>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <span className="text-black">Tổng tiền hàng</span>
                </div>
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <strong className="text-black">{calculateTotal()}.000</strong>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <span className="text-black">Phí vận chuyển</span>
                </div>
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <strong className="text-black">20.000</strong>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <span className="text-black">Tổng thanh toán</span>
                </div>
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                  <strong className="text-black">{calculateTotal()+20}.000</strong>
                </div>
              </div>
  
              <div className="row">
                <div className="col-md-12">
                  <button className="btn btn-black btn-lg py-3 btn-block" onClick={() => window.location='/checkout'}>Thanh toán</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  