import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { NavLink } from "react-router-dom";

export default function Checkout() {
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
                    <input type="text" className="form-control" id="c_companyname" name="c_companyname" placeholder="Nhập họ và tên của bạn"/>
                  </div>
                </div>
                <br></br>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: 'left' }}>
                    <label htmlFor="c_address" className="text-black">
                      Địa chỉ <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Nhập địa chỉ của bạn" />
                  </div>
                </div>
                <br></br>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: 'left' }}>
                    <label htmlFor="c_address" className="text-black">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Nhập địa chỉ email của bạn" />
                  </div>
                </div>
                <br></br>

                <div className="form-group row">
                  <div className="col-md-12" style={{ textAlign: 'left' }}>
                    <label htmlFor="c_address" className="text-black">
                      Số điện thoại <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Nhập số điện thoại của bạn" />
                  </div>
                </div>
                <br></br>

                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label htmlFor="c_order_notes" className="text-black">Ghi chú</label>
                  <textarea name="c_order_notes" id="c_order_notes" cols="30" rows="5" className="form-control" placeholder="Nhập ghi chú của bạn"></textarea>
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
                        <tr>
                          <td>Top Up T-Shirt <strong className="mx-2">x</strong> 1</td>
                          <td>$250.00</td>
                        </tr>
                        <tr>
                          <td>Polo Shirt <strong className="mx-2">x</strong> 1</td>
                          <td>$100.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Tổng tiền hàng</strong></td>
                          <td className="text-black">$350.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Phí vận chuyển</strong></td>
                          <td className="text-black">$20</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Tổng thanh toán</strong></td>
                          <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="form-group">
                      <button className="btn btn-black btn-lg py-3 btn-block" onClick={() => window.location='/thankyou'}>Thanh Toán</button>
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
