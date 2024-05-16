import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function Checkout() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    // const [userId, setUserId] = useState("");
    // Lấy thông tin hóa đơn từ localStorage
    const invoice = JSON.parse(localStorage.getItem("invoice"));

    const [formData, setFormData] = useState({
        companyName: "",
        address: "",
        email: "",
        phone: "",
        orderNotes: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckout = () => {
        const data = {
            ...formData,
            cart: { user: { id: userId } }, // Sử dụng ID của người dùng đăng nhập
            total: invoice.total,
            grandTotal: invoice.grandTotal
        };

        axios.post("http://localhost:8080/createBill", data)
            .then((response) => {
                console.log(response.data);
                // Xoá giỏ hàng từ localStorage trước khi chuyển hướng trang
                localStorage.removeItem("cartItems");
                // Chuyển hướng qua trang ThankYou sau khi thanh toán thành công
                window.location.href = '/thankyou';
            })
            .catch((error) => {
                console.error("Error creating BillDetail:", error);
                // Xử lý lỗi
            });
    };
  return (
    <div>
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
                    <label htmlFor="c_companyname" className="text-black">Họ và tên </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_companyname"
                      name="companyName"
                      placeholder="Nhập họ và tên của bạn"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <br></br>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: "left" }}>
                    <label htmlFor="c_address" className="text-black">
                      Địa chỉ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_address"
                      name="address"
                      placeholder="Nhập địa chỉ của bạn"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: "left" }}>
                    <label htmlFor="c_email" className="text-black">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_email"
                      name="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: "left" }}>
                    <label htmlFor="c_phone" className="text-black">
                      Số điện thoại <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_phone"
                      name="phone"
                      placeholder="Nhập số điện thoại của bạn"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
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
                        <th>Sản phẩm</th>
                        <th>Tổng</th>
                      </thead>
                      <tbody>
                        {invoice.cartItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.product.nameP} <strong className="mx-2">x</strong> {item.quantity}</td>
                            <td>{item.product.price * item.quantity}.000 VNĐ</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Tổng tiền hàng</strong></td>
                          <td className="text-black">{invoice.total}.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Phí vận chuyển</strong></td>
                          <td className="text-black">20.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Tổng thanh toán</strong></td>
                          <td className="text-black font-weight-bold">{invoice.grandTotal}.000 VNĐ</td>
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
    </div>
  );
}
