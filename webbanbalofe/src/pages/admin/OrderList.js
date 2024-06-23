import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Component/admin/Sidebar';

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading để xử lý tình trạng loading
    const pageSize = 10;

    useEffect(() => {
        fetchOrderList();
    }, [currentPage]);  // Fetch data whenever currentPage changes

    const fetchOrderList = () => {
        setIsLoading(true); // Bắt đầu loading
        axios.get(`http://localhost:8080/bills?page=${currentPage}&size=${pageSize}`)
        .then(response => {
            console.log("Order list response:", response); // Log toàn bộ response để xem cấu trúc
            setOrderList(response.data.content);
            setTotalPages(response.data.totalPages);
        })
        .catch(error => {
            console.error("Error fetching order list:", error);
            // Xử lý lỗi bằng cách set state hoặc hiển thị thông báo lỗi
        })
        .finally(() => {
            setIsLoading(false); // Kết thúc loading, ẩn thông báo loading khi dữ liệu đã được load xong
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
        setIsLoading(true); // Bắt đầu loading khi click vào Xem chi tiết
        axios.get(`http://localhost:8080/bills/${orderId}`)
            .then((response) => {
                setSelectedOrder(response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API để lấy thông tin hóa đơn:", error);
                // Xử lý lỗi khi cần thiết
            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading khi dữ liệu được load xong
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
                    {isLoading ? (
                        // Hiển thị thông báo loading khi đang tải dữ liệu
                        <div className="text-center">Loading...</div>
                    ) : (
                        // Hiển thị danh sách đơn hàng hoặc chi tiết đơn hàng
                        selectedOrder ? (
                            <div className="mt-5 p-3 p-lg-5 border bg-white">
                                <h2 className="h3 mb-3 text-black">Chi tiết hóa đơn</h2>
                                {/* Phần chi tiết hóa đơn */}
                            </div>
                        ) : (
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
                                        {orderList.map((order) => (
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
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
