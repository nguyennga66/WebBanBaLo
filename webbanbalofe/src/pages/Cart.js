import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  // Xử lý khi người dùng nhập số lượng
  const handleQuantityChange = (event) => {
    const inputQuantity = event.target.value;
    // Chuyển đổi input thành số nguyên và đảm bảo nó không nhỏ hơn 1
    const newQuantity = Math.max(1, parseInt(inputQuantity, 10));
    setQuantity(newQuantity);
  };


  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Giỏ hàng</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>

      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
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
                    <tr>
                      <td className="product-thumbnail">
                        <img src={require("../images/product-1.png")} alt="Image" className="img-fluid" />
                      </td>
                      <td className="product-name">
                        <h2 className="h5 text-black">Product 1</h2>
                      </td>
                      <td>$49.00</td>
                      <td>
                        <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: "120px" }}>
                          
                          <input
                            type="number"
                            className="form-control text-center quantity-amount"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            aria-label="Quantity input"
                            aria-describedby="button-addon1"
                          />
                          
                        </div>
                      </td>
                      <td>${49.00 * quantity}.00</td>
                      <td><button className="btn btn-black btn-sm">X</button></td>
                    </tr>
                    {/* Các sản phẩm khác bạn có thể lặp lại tương tự */}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button className="btn btn-black btn-sm btn-block">Cập nhật giỏ hàng</button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-outline-black btn-sm btn-block">Tiếp tục mua sắm</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">Phiếu giảm giá</label>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input type="text" className="form-control py-3" id="coupon" placeholder="Nhập phiếu giảm giá của bạn" />
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
                    <div className="col-md-6">
                      <span className="text-black">Tổng tiền</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">$230.00</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Tổng</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">$230.00</strong>
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
      </div>
    </div>
  );
}
