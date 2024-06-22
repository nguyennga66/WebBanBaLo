import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import Footer from '../Component/Footer';
import Header from '../Component/Header';

export default function Checkout() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const [invoice, setInvoice] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const storedInvoice = JSON.parse(localStorage.getItem("invoice"));
        if (storedInvoice) {
            setInvoice(storedInvoice);
        }
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        email: "",
        phone: "",
        orderNotes: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate each field as it is updated
        setFormErrors({ ...formErrors, [name]: validateField(name, value) });
    };

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "fullName":
                if (value.trim() === "") {
                    error = "Vui lòng nhập họ và tên";
                }
                break;
            case "address":
                if (value.trim() === "") {
                    error = "Vui lòng nhập địa chỉ";
                }
                break;
            case "email":
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    error = "Email không hợp lệ";
                }
                break;
            case "phone":
                if (!/^\d{10,11}$/.test(value)) {
                    error = "Số điện thoại không hợp lệ";
                }
                break;
            default:
                break;
        }

        return error;
    };

    const handleCheckout = () => {
        // Check if required fields are filled
        const requiredFields = ["fullName", "address", "email", "phone"];
        const newFormErrors = {};
        let hasError = false;

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newFormErrors[field] = "Vui lòng nhập thông tin";
                hasError = true;
            }
        });

        if (hasError) {
            setFormErrors({ ...formErrors, ...newFormErrors });
            console.error("Form không hợp lệ");
            return;
        }

        // Proceed with checkout logic
        const formValid = Object.values(formErrors).every(error => error === "");

        if (!formValid) {
            console.error("Form không hợp lệ");
            return;
        }

        if (!invoice) {
            console.error("Không tìm thấy hóa đơn");
            return;
        }

        const data = {
            ...formData,
            userId: userId,
            billDetails: invoice.cartItems.map((item) => ({
                product: { id: item.product.id },
                quantity: item.quantity,
                price: item.product.price,
                total: item.product.price * item.quantity,
            })),
            cart: { user: { id: userId } }, // Sử dụng ID của người dùng đăng nhập
            total: invoice.total,
            grandTotal: invoice.grandTotal,
            shippingFee: 20 // Ví dụ về phí vận chuyển
        };

        console.log("Dữ liệu thanh toán:", data); // Kiểm tra dữ liệu gửi đi

        axios.post("http://localhost:8080/createBill", data)
            .then((response) => {
                console.log(response.data);
                // Lưu hóa đơn vào localStorage
                // localStorage.setItem("productList", JSON.stringify(response.data));

                // Xoá giỏ hàng từ localStorage trước khi chuyển hướng trang
                localStorage.removeItem("cartItems");
                // Chuyển hướng qua trang ThankYou sau khi thanh toán thành công
                window.location.href = '/thankyou';
            })
            .catch((error) => {
                console.error("Lỗi khi tạo hóa đơn:", error);
                // Xử lý lỗi
            });
    };

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Thanh toán</h1>
                            </div>
                        </div>
                        <div className="col-lg-7"></div>
                    </div>
                </div>
            </div>

            <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-5 mb-md-0">
                            <h2 className="h3 mb-3 text-black">Chi tiết hóa đơn</h2>
                            <div className="p-3 p-lg-5 border bg-white">
                                <div className="form-group row">
                                    <div className="col-md-12" style={{ textAlign: 'left' }}>
                                        <label htmlFor="c_fullname" className="text-black">Họ và tên </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                                            id="c_fullname"
                                            name="fullName"
                                            placeholder="Nhập họ và tên của bạn"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12" style={{ textAlign: "left" }}>
                                        <label htmlFor="c_address" className="text-black">
                                            Địa chỉ <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                                            id="c_address"
                                            name="address"
                                            placeholder="Nhập địa chỉ của bạn"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12" style={{ textAlign: "left" }}>
                                        <label htmlFor="c_email" className="text-black">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                            id="c_email"
                                            name="email"
                                            placeholder="Nhập địa chỉ email của bạn"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12" style={{ textAlign: "left" }}>
                                        <label htmlFor="c_phone" className="text-black">
                                            Số điện thoại <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                            id="c_phone"
                                            name="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                                    </div>
                                </div>

                                <div className="form-group" style={{ textAlign: "left" }}>
                                    <label htmlFor="c_order_notes" className="text-black">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        name="orderNotes"
                                        id="c_order_notes"
                                        cols="30"
                                        rows="5"
                                        className="form-control"
                                        placeholder="Nhập ghi chú của bạn"
                                        value={formData.orderNotes}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Mã giảm giá</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <div className="input-group w-75 couponcode-wrap">
                                            <input type="text" className="form-control me-2" id="c_code" placeholder="Nhập mã giảm giá" aria-label="Coupon Code" aria-describedby="button-addon2" />
                                            <div className="input-group-append">
                                            <button className="btn btn-black btn-sm" type="button" id="button-addon2">Áp dụng</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Hóa đơn</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <table className="table site-block-order-table mb-5">
                                            <thead>
                                                <tr>
                                                    <th>Sản phẩm</th>
                                                    <th>Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice.cartItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.product.nameP} <strong className="mx-2">x</strong> {item.quantity}</td>
                                                        <td>{(item.product.price * item.quantity).toLocaleString('vi-VN')}.000 VND</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>Tạm tính</strong>
                                                    </td>
                                                    <td className="text-black">{invoice.total.toLocaleString('vi-VN')}.000 VND</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>Phí vận chuyển</strong>
                                                    </td>
                                                    <td className="text-black">{(20000).toLocaleString('vi-VN')}.000 VND</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>Tổng cộng</strong>
                                                    </td>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>{invoice.grandTotal.toLocaleString('vi-VN')}.000 VND</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="form-group">
                                            <button className="btn btn-black btn-lg py-3 btn-block" onClick={handleCheckout}>Thanh Toán</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
