import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Gọi API tìm kiếm khi searchQuery thay đổi
    useEffect(() => {
        if (searchQuery) {
            fetch(`http://localhost:8080/products/search?query=${encodeURIComponent(searchQuery)}`)
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        } else {
            // Nếu searchQuery trống, gọi lại API để lấy tất cả sản phẩm
            fetch('http://localhost:8080/products')
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [searchQuery]);

    // Gọi API để lấy danh mục sản phẩm
    useEffect(() => {
        fetch('http://localhost:8080/category')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryClick = (categoryId) => {
        // Gọi API để lấy danh sách sản phẩm theo thể loại
        fetch(`http://localhost:8080/products/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data); // Cập nhật danh sách sản phẩm
            })
            .catch(error => {
                console.error('Error fetching products by category:', error);
            });
    };

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
                        {/* Cột chứa danh mục sản phẩm */}
                        <div className="col-lg-3">
                            <div className="categories-section">
                                <h4 className="categories-title">Danh mục sản phẩm</h4>
                                <ul className="categories-list list-unstyled">
    {categories.map((category) => (
        <li key={category.id} className="category-item">
            {/* Thay button bằng span */}
            <span
                className="category-link"
                onClick={() => handleCategoryClick(category.id)} // Sử dụng hàm xử lý sự kiện nhấp chuột
                style={{ cursor: 'pointer' }} // Đặt con trỏ chuột thành dạng pointer
            >
                <span className="category-icon">&#x1F4E6;</span>
                <span className="category-name">{category.nameC}</span>
            </span>
        </li>
    ))}
</ul>


                            </div>
                        </div>


                        {/* Cột chứa danh sách sản phẩm */}
                        <div className="col-lg-9">
                            {/* Thanh tìm kiếm */}
                            <div className="search-bar d-flex align-items-center mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{ width: '300px', marginRight: '10px' }}
                                />
                                {/* Biểu tượng tìm kiếm */}
                                <FaSearch style={{ color: 'black', cursor: 'pointer' }} />
                            </div>
                            <br></br>
                            <div className="row">
                                {/* Danh sách sản phẩm */}
                                {products.map(product => (
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <NavLink className="product-item" to={`/product_page/${product.id}`}>
                                            <img src={require(`../images/product/${product.image}`)} className="img-fluid product-thumbnail" alt="Product" />
                                            <h3 className="product-title">{product.nameP}</h3>
                                            <strong className="product-price">{product.price}.000 VNĐ</strong>
                                            <span className="icon-cross">
                                                <FaShoppingCart style={{ color: 'white' }} />
                                            </span>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
