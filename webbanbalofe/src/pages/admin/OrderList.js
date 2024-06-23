import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Component/admin/Sidebar';

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const pageSize = 10;

    useEffect(() => {
        fetchOrderList();
    }, [currentPage]);  // Fetch data whenever currentPage changes

    const fetchOrderList = () => {
        axios.get(`http://localhost:8080/bills?page=${currentPage}&size=${pageSize}`)
            .then(response => {
                console.log("Order list response:", response.data);
                setOrderList(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching order list:", error);
            });
    };

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
        axios.get(`http://localhost:8080/bills/${orderId}`)
            .then((response) => {
                setSelectedOrder(response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API để lấy thông tin hóa đơn:", error);
            });
    };

    const handleCancelOrder = (orderId) => {
        axios.put(`http://localhost:8080/cancel/${orderId}`)
            .then(response => {
                console.log("Order cancelled:", response.data);
                fetchOrderList();  // Refresh order list after cancel
            })
            .catch(error => {
                console.error("Error cancelling order:", error);
            });
    };

    const handleApproveOrder = (orderId) => {
        axios.put(`http://localhost:8080/approve/${orderId}`)
            .then(response => {
                console.log("Order approved:", response.data);
                fetchOrderList();  // Refresh order list after approve
            })
            .catch(error => {
                console.error("Error approving order:", error);
            });
    };

    const handleBackToList = () => {
        setSelectedOrder(null);  // Clear selectedOrder to return to the list view
    };

    return (
        <div className="container mt-4">
            <div id="page-wrapper">
                <div className="row">
                    <Sidebar />
                    {selectedOrder ? (
                        // Display order details if selectedOrder is not null
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
                                    <p>Trạng thái: {selectedOrder.status === 0 ? 'Chưa duyệt' : selectedOrder.status === 1 ? 'Đang vận chuyển' : 'Đã hủy'}</p>
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
                            <button className="btn btn-secondary" onClick={handleBackToList}>Quay lại</button>
                        </div>
                    ) : (
                        // Display order list if selectedOrder is null
                        <div className="p-3 p-lg-5 border bg-white">
                            <h4><b>Danh sách đơn hàng</b></h4><br /><br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Người nhận</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Tổng tiền</th>
                                        <th>Thanh toán</th>
                                        <th>Trạng thái</th>
                                        <th>Kiểm duyệt</th>
                                        <th>Xem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orderList) && orderList.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.fullName}</td>
                                            <td>{order.address}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.grandTotal.toLocaleString('vi-VN')}.000 VNĐ</td>
                                            <td>Đã thanh toán</td>
                                            <td>{order.status === 0 ? 'Chưa duyệt' : order.status === 1 ? 'Đang vận chuyển' : 'Đã hủy'}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="btn btn-danger mr-2"
                                                    disabled={order.status !== 0}  // Chỉ có thể hủy đơn hàng chưa duyệt
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    onClick={() => handleApproveOrder(order.id)}
                                                    className="btn btn-success"
                                                    disabled={order.status !== 0}  // Chỉ có thể duyệt đơn hàng chưa duyệt
                                                >
                                                    Duyệt
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleViewDetails(order.id)}
                                                    className="btn btn-primary mr-2"
                                                >
                                                    Xem
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
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
