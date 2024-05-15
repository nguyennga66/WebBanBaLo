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
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortChange = (sortType) => {
        if (sortType === 'asc') {
            fetchProducts('asc');
        } else {
            fetchProducts('desc');
        }
        setIsOpen(false); // Đóng dropdown sau khi chọn
    };

    // Gọi API tìm kiếm khi searchQuery thay đổi
    const fetchProducts = async (sort = 'asc') => {
        try {
            let url = `http://localhost:8080/products/sort?sort=${sort}&page=${page}&size=${size}`;
            if (searchQuery) {
                url += `&query=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Gọi API mỗi khi page, size hoặc searchQuery thay đổi
    useEffect(() => {
        fetchProducts();
    }, [page, size, searchQuery]);

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
        setPage(0); // Đặt lại trang về trang đầu tiên khi chọn danh mục mới
        fetchProductsByCategory(categoryId);
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/products/category/${categoryId}?page=${page}&size=${size}`
            );
            const data = await response.json();
            // Cập nhật state
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    // Xử lý chuyển trang
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row">
                        {/* Cột chứa danh mục sản phẩm */}
                        <div className="col-lg-3">
                            <div className="categories-section">
                                <h4 className="categories-title" style={{ textAlign: 'left' }}>Danh mục sản phẩm</h4>
                                <ul className="categories-list list-unstyled" style={{ textAlign: 'left' }}>
                                {categories.map((category) => (
                                    <li key={category.id} className="category-item" >
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
                            <div class="border-bottom mb-4 pb-4">
                                <h5 class="font-weight-semi-bold mb-4">Lọc sản phẩm theo giá</h5>
                                <form>
                                    {/* Form lọc sản phẩm theo giá */}
                                </form>
                            </div>
                        </div>


                        {/* Cột chứa danh sách sản phẩm */}
                        <div className="col-lg-9">
                            {/* Thanh tìm kiếm */}
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            style={{ width: '300px', marginRight: '10px' }}
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-transparent text-primary">
                                                <FaSearch />
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="dropdown ml-4">
                                    <button className="btn border dropdown-toggle" type="button" id="triggerId" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen ? "true" : "false"}>
                                        Sắp xếp theo
                                    </button>
                                    {isOpen && (
                                        <div className="dropdown-content" aria-labelledby="triggerId">
                                            <a className="dropdown-item" href="#" onClick={() => handleSortChange('asc')}>Giá tăng dần</a>
                                            <a className="dropdown-item" href="#" onClick={() => handleSortChange('desc')}>Giá giảm dần</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                {/* Danh sách sản phẩm */}
                                {Array.isArray(products) && products.map(product => (
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
                            {/* Phân trang */}
                            <div className="pagination-container">
                                <button
                                    className="btn btn-primary"
                                    disabled={page <= 0}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    Trang trước
                                </button>
                                <span> Trang {page + 1} / {totalPages} </span>
                                <button
                                    className="btn btn-primary"
                                    disabled={page >= totalPages - 1}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    Trang sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
