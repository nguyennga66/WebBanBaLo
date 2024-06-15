import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce";
import Footer from '../Component/Footer'
import Header from '../Component/Header'

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState(''); // State để lưu loại sắp xếp hiện tại
    const [currentCategory, setCurrentCategory] = useState(null); // State để lưu danh mục hiện tại
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortChange = (sortType) => {
        setCurrentSort(sortType);
        if (currentCategory) {
            fetchProductsByCategory(currentCategory, sortType);
        } else {
            fetchProducts(sortType);
        }
        setIsOpen(false);
    };

    const fetchProducts = async (sort = currentSort) => {
        try {
            let url = `http://localhost:8080/products?page=${page}&size=${size}`;
            if (sort) {
                url += `/sort?sort=${sort}&page=${page}&size=${size}`;
            }
            if (searchQuery) {
                url += `/search?search=${searchQuery}&page=${page}&size=${size}`;
            }
            if (minPrice) {
                url = `http://localhost:8080/products/filter?`;
                url += `&minPrice=${minPrice}`;
            }
            if (maxPrice) {
                url = `http://localhost:8080/products/filter?`;
                url += `&maxPrice=${maxPrice}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.content);
            setTotalPages(data.totalPages);

            console.log(url);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsByCategory = async (categoryId, sort = currentSort) => {
        try {
            setCurrentCategory(categoryId);
            let url = `http://localhost:8080/products/category/${categoryId}`;
            if (sort) {
                url += `/sort?sort=${sort}&page=${page}&size=${size}`;
            }
            if (searchQuery) {
                url += `/search?search=${searchQuery}&page=${page}&size=${size}`;
            }
            if (minPrice) {
                url = `http://localhost:8080/products/category/${categoryId}/filter?`;
                url += `&minPrice=${minPrice}`;
            }
            if (maxPrice) {
                url = `http://localhost:8080/products/category/${categoryId}/filter?`;
                url += `&maxPrice=${maxPrice}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.content);
            setTotalPages(data.totalPages);

            console.log(url);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    useEffect(() => {
        if (currentCategory) {
            fetchProductsByCategory(currentCategory);
        } else {
            fetchProducts();
        }
    }, [page, size, searchQuery, currentSort, minPrice, maxPrice]);

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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    return (
        <div>
            <Header />
            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row">
                        {/* Cột chứa danh mục sản phẩm */}
                        <div className="col-lg-3">
                            <div className="categories-section">
                                <h4 className="categories-title" style={{ textAlign: 'left' }}>Danh mục sản phẩm</h4>
                                <ul className="categories-list list-unstyled" style={{ textAlign: 'left' }}>
                                    {categories.map((category) => (
                                        <li key={category.id} className="category-item">
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
                            <br></br>
                            <div className="border-bottom mb-4 pb-4">
                                <h4 className="font-weight-semi-bold mb-4">Lọc sản phẩm theo giá</h4>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="minPrice">Giá thấp nhất</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="minPrice"
                                            value={minPrice}
                                            onChange={handleMinPriceChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="maxPrice">Giá cao nhất</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="maxPrice"
                                            value={maxPrice}
                                            onChange={handleMaxPriceChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Cột chứa danh sách sản phẩm */}
                        <div className="col-lg-9">
                            {/* Thanh tìm kiếm */}
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            style={{ width: '300px', marginRight: '10px' }}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-transparent text-primary">
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
                                        <div className="dropdown-menu show" aria-labelledby="triggerId">
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
            <Footer />
        </div>
    );
}