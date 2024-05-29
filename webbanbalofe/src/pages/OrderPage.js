import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function OrderPage() {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 10;

  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    // Gọi API để lấy danh sách hóa đơn của người dùng với phân trang
    axios.get(`http://localhost:8080/bills?userId=${userId}&page=${currentPage}&size=${pageSize}`)
      .then((response) => {
        setOrderList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API để lấy danh sách hóa đơn:", error);
      });
  }, [currentPage, userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewDetails = (orderId) => {
    // Gọi API để lấy thông tin chi tiết hóa đơn từ backend
    axios.get(`http://localhost:8080/bills/${orderId}`)
      .then((response) => {
        setSelectedOrder(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API để lấy thông tin hóa đơn:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="h3 mb-3 text-black">Danh sách hóa đơn</h2>
      <div className="p-3 p-lg-5 border bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>ID Hóa đơn</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.fullName}</td>
                <td>{order.address}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.grandTotal.toLocaleString('vi-VN')}.000 VNĐ</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="btn btn-primary"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="btn btn-secondary"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Trước
          </button>
          {Array.from(Array(totalPages).keys()).map((page) => (
            <button
              key={page}
              className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handlePageChange(page)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Tiếp
          </button>
        </div>
      </div>
      {selectedOrder && (
        <div className="mt-5 p-3 p-lg-5 border bg-white">
          <h2 className="h3 mb-3 text-black">Chi tiết hóa đơn</h2>
          <div className="row">
            <div className="col-md-6">
              <h4>Thông tin khách hàng</h4>
              <p>Họ và tên: {selectedOrder.fullName}</p>
              <p>Địa chỉ: {selectedOrder.address}</p>
              <p>Email: {selectedOrder.email}</p>
              <p>Số điện thoại: {selectedOrder.phone}</p>
              <p>Ghi chú: {selectedOrder.orderNotes}</p>
            </div>
            <div className="col-md-6">
              <h4>Thông tin hóa đơn</h4>
              <p>Tổng tiền hàng: {selectedOrder.total.toLocaleString('vi-VN')}.000 VNĐ</p>
              <p>Phí vận chuyển: {selectedOrder.shippingFee.toLocaleString('vi-VN')}.000 VNĐ</p>
              <p>Tổng thanh toán: {selectedOrder.grandTotal.toLocaleString('vi-VN')}.000 VNĐ</p>
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
              {selectedOrder.billDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.product.nameP}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.product.price.toLocaleString('vi-VN')}.000 VNĐ</td>
                  <td>{(detail.product.price * detail.quantity).toLocaleString('vi-VN')}.000 VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


