import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function OrderPage() {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    // Gọi API để lấy danh sách hóa đơn với phân trang
    axios.get(`http://localhost:8080/bills?page=${currentPage}&size=${pageSize}`)
      .then((response) => {
        setOrderList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API để lấy danh sách hóa đơn:", error);
      });
  }, [currentPage]);

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

  return (
    <div className="container mt-5">
      <h2 className="h3 mb-3 text-black">Danh sách hóa đơn</h2>
      <div className="p-3 p-lg-5 border bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>ID Hóa đơn</th>
              <th>Tên công ty</th>
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
                <td>{order.companyName}</td>
                <td>{order.address}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.grandTotal}.000 VNĐ</td>
                <td>
                  <Link to={`/order/${order.id}`} className="btn btn-primary">
                    Xem chi tiết
                  </Link>
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
            Previous
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
