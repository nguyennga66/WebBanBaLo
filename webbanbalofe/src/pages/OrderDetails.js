import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết hóa đơn từ backend
    axios.get(`http://localhost:8080/bills/${orderId}`)
      .then((response) => {
        setOrderDetails(response.data); // Lưu thông tin hóa đơn vào state
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API để lấy thông tin hóa đơn:", error);
      });
  }, [orderId]);

  if (!orderDetails) {
    return <div>Đang tải...</div>; // Hiển thị thông báo đang tải nếu dữ liệu chưa sẵn sàng
  }

  return (
    <div className="container mt-5">
      <h2 className="h3 mb-3 text-black">Chi tiết hóa đơn</h2>
      <div className="p-3 p-lg-5 border bg-white">
        <div className="row">
          <div className="col-md-6">
            <h4>Thông tin khách hàng</h4>
            <p>Tên công ty: {orderDetails.companyName}</p>
            <p>Địa chỉ: {orderDetails.address}</p>
            <p>Email: {orderDetails.email}</p>
            <p>Số điện thoại: {orderDetails.phone}</p>
            <p>Ghi chú: {orderDetails.orderNotes}</p>
          </div>
          <div className="col-md-6">
            <h4>Thông tin hóa đơn</h4>
            <p>Tổng tiền hàng: {orderDetails.total}.000 VNĐ</p>
            <p>Phí vận chuyển: {orderDetails.shippingFee}.000 VNĐ</p>
            <p>Tổng thanh toán: {orderDetails.grandTotal}.000 VNĐ</p>
          </div>
        </div>

        <h4 className="mt-4">Danh sách sản phẩm</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cart.cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.product.nameP}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price}.000 VNĐ</td>
                <td>{item.product.price * item.quantity}.000 VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
