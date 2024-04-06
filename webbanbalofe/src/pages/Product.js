import React from "react";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Product() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shop</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">

            <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src={require("../images/product-3.png")} className="img-fluid product-thumbnail" alt="Nordic Chair"/>
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </a>
            </div> 

            <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
              <img src={require("../images/product-1.png")} className="img-fluid product-thumbnail" alt="Nordic Chair"/>
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </a>
            </div> 

            <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
              <img src={require("../images/product-2.png")} className="img-fluid product-thumbnail" alt="Kruzo Aero Chair"/>
                <h3 className="product-title">Kruzo Aero Chair</h3>
                <strong className="product-price">$78.00</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </a>
            </div>
            
            <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
              <img src={require("../images/product-3.png")} className="img-fluid product-thumbnail" alt="Ergonomic Chair"/>
                <h3 className="product-title">Ergonomic Chair</h3>
                <strong className="product-price">$43.00</strong>

                <span className="icon-cross">
                <FaShoppingCart style={{ color: 'white' }} />
               </span>
              </a>
            </div>

            {/* Add other product items here with similar structure */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
