import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { FaHeart, FaTrash } from 'react-icons/fa';
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
    const [currentSort, setCurrentSort] = useState('');
    const [currentCategory, setCurrentCategory] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [averageRatings, setAverageRatings] = useState({});

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortChange = (sortType) => {
        setCurrentSort(sortType);
        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');
        setPage(0);
        setIsOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setMinPrice('');
        setMaxPrice('');
        setCurrentSort('');
        setPage(0);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        setSearchQuery('');
        setCurrentSort('');
        setPage(0);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        setSearchQuery('');
        setCurrentSort('');
        setPage(0);
    };

    const handleCategoryClick = (categoryId) => {
        setCurrentCategory(categoryId);
        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');
        setCurrentSort('');
        setPage(0);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    
    // Thêm hàm fetchProductRatings vào Product component
    const fetchProductRatings = async (products) => {
        try {
            const promises = products.map(async (product) => {
                const response = await fetch(`http://localhost:8080/reviews/${product.id}`);
                const data = await response.json();
                if (data.length > 0) {
                    const totalStars = data.reduce((acc, review) => acc + review.rating, 0);
                    const averageRating = totalStars / data.length;
                    return { productId: product.id, averageRating, totalReviews: data.length };
                } else {
                    return { productId: product.id, averageRating: 0, totalReviews: 0 };
                }
            });
    
            const ratings = await Promise.all(promises);
            const ratingsMap = {};
            ratings.forEach(rating => {
                ratingsMap[rating.productId] = { averageRating: rating.averageRating, totalReviews: rating.totalReviews };
            });
    
            setAverageRatings(ratingsMap);
        } catch (error) {
            console.error('Error fetching product ratings:', error);
        }
    };
    

// Cập nhật hàm fetchProducts và fetchProductsByCategory
const fetchProducts = async () => {
    try {
        let url = `http://localhost:8080/products/filter?page=${page}&size=${size}`;
        if (currentSort) {
            url = `http://localhost:8080/products/sort?sort=${currentSort}&page=${page}&size=${size}`;
        } else if (searchQuery) {
            url = `http://localhost:8080/products/search?search=${searchQuery}&page=${page}&size=${size}`;
        } else if (minPrice || maxPrice) {
            url = `http://localhost:8080/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.content);
        setTotalPages(data.totalPages);

        // Sau khi set products, gọi fetchProductRatings
        fetchProductRatings(data.content);

        console.log(url);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchProductsByCategory = async () => {
    try {
        let url = `http://localhost:8080/products/category/${currentCategory}?page=${page}&size=${size}`;
        if (currentSort) {
            url = `http://localhost:8080/products/category/${currentCategory}/sort?sort=${currentSort}&page=${page}&size=${size}`;
        } else if (searchQuery) {
            url = `http://localhost:8080/products/category/${currentCategory}/search?search=${searchQuery}&page=${page}&size=${size}`;
        } else if (minPrice || maxPrice) {
            url = `http://localhost:8080/products/category/${currentCategory}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.content);
        setTotalPages(data.totalPages);

        // Sau khi set products, gọi fetchProductRatings
        fetchProductRatings(data.content);

        console.log(url);
    } catch (error) {
        console.error('Error fetching products by category:', error);
    }
};

// Cập nhật hàm renderRatingStars để hiển thị dữ liệu đánh giá
const renderRatingStars = (averageRating, totalReviews) => {
    const stars = [];

    if (averageRating && averageRating > 0) {
        const fullStars = Math.floor(averageRating);
        const halfStar = averageRating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={i} className="star-icon" />);
        }

        if (halfStar) {
            stars.push(<FontAwesomeIcon icon={regularStar} key={stars.length} className="star-icon" />);
        }

        stars.push(<span key="rating-number" className="rating-number">{averageRating.toFixed(1)}</span>);
        stars.push(<span key="total-reviews" className="total-reviews">({totalReviews} đánh giá)</span>);
    } else {
        stars.push(<span key="no-rating">Chưa có đánh giá</span>);
    }

    return stars;
};


    useEffect(() => {
        if (currentCategory) {
            fetchProductsByCategory();
        } else {
            fetchProducts();
        }
    }, [page, size, searchQuery, currentSort, minPrice, maxPrice, currentCategory]);

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
                                                onClick={() => handleCategoryClick(category.id)}
                                                style={{ cursor: 'pointer' }}
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
                                            <div className="product-rating">
                                                {averageRatings[product.id] && renderRatingStars(averageRatings[product.id].averageRating, averageRatings[product.id].totalReviews)}
                                            </div>
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
