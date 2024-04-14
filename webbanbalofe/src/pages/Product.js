import React, { useEffect, useState } from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Product() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch('')
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Sản phẩm</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {/* {products.map(product => (
              <div className="col-12 col-md-4 col-lg-3 mb-5" key={product.idP}>
                <a className="product-item" href="#">
                  <img src={`/images/product/${product.image}`} className="img-fluid product-thumbnail" alt="Product" />
                  <h3 className="product-title">{product.nameP}</h3>
                  <strong className="product-price">{product.priceP}00 VNĐ</strong>
                  <span className="icon-cross">
                    <FaShoppingCart style={{ color: 'white' }} />
                  </span>
                </a>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
