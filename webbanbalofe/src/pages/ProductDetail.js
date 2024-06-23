import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/product-detail.css";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState([]);
    const [role, setRole] = useState("");
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: '',
        name: '',
        email: '',
        comment: ''
    });
    const [canReview, setCanReview] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserId(user.id);
            setRole(user.role);
        }
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API để lấy chi tiết sản phẩm:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/reviews/${id}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API để lấy đánh giá sản phẩm:', error);
            });
    }, [id]);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`http://localhost:8080/bills/user/${userId}?page=0&size=100`)
                .then(response => {
                    const hasPurchased = response.data.content.some(bill => {
                        return bill.billDetails.some(detail => detail.product.id === parseInt(id));
                    });
                    setCanReview(hasPurchased);
                })
                .catch(error => {
                    console.error('Lỗi khi kiểm tra người dùng có thể đánh giá:', error);
                });
        }
    }, [id, isLoggedIn, userId]);

    const handleQuantityChange = (event) => {
        const quantityValue = parseInt(event.target.value);
        setQuantity(quantityValue > 0 ? quantityValue : 1);
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            window.location.href = '/signin';
            return;
        }

        if (role === 1) {
            alert('Admin không thể thêm vào giỏ hàng');
            return;
        }

        const cartItem = {
            cart: { user: { id: userId } },
            product: { id: product.id },
            quantity: quantity
        };

        axios.post('http://localhost:8080/carts', cartItem)
            .then(response => {
                alert(response.data);
                window.location.href = `/cart/${userId}`;
            })
            .catch(error => {
                console.error('Lỗi khi gửi yêu cầu:', error);
                setError('Có lỗi xảy ra khi thêm vào giỏ hàng');
            });
    };

    const handleReviewChange = (event) => {
        const { name, value } = event.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();

        if (role === 1) {
            alert('Admin không thể đánh giá sản phẩm');
            return;
        }

        const reviewData = {
            user: { id: userId },
            product: { id: product.id },
            rating: newReview.rating,
            comment: newReview.comment,
        };

        axios.post('http://localhost:8080/reviews', reviewData)
            .then(response => {
                setReviews([...reviews, response.data]);
                setNewReview({ rating: 0, comment: '' });
            })
            .catch(error => {
                console.error('Lỗi khi gửi đánh giá:', error);
                setError('Có lỗi xảy ra khi gửi đánh giá');
            });
    };

    const handleDeleteReview = (reviewId) => {
        axios.delete(`http://localhost:8080/reviews/${reviewId}`)
            .then(response => {
                setReviews(reviews.filter(review => review.id !== reviewId));
            })
            .catch(error => {
                console.error('Error deleting review:', error);
                alert('Error deleting review');
            });
    };

    const handleRatingChange = (rating) => {
        setNewReview({ ...newReview, rating });
    };

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (isLoggedIn) {
                try {
                    const response = await axios.get(`http://localhost:8080/favorites/${userId}`);
                    const favorites = response.data;
                    const isProductFavorited = favorites.some(favorite => favorite.product.id === parseInt(id));
                    setIsFavorite(isProductFavorited);
                } catch (error) {
                    console.error('Error checking if product is favorited:', error);
                    setIsFavorite(false);
                }
            }
        };

        checkIfFavorite();
    }, [isLoggedIn, userId, id]);

    const handleAddFavorite = () => {
        if (role === 1) {
            alert('Admin không thể thêm sản phẩm vào yêu thích');
            return;
        }

        const favoriteData = {
            user: { id: userId },
            product: { id: product.id }
        };

        axios.post('http://localhost:8080/favorites', favoriteData)
            .then(response => {
                setIsFavorite(true);
                alert(response.data);
            })
            .catch(error => {
                console.error('Error adding favorite:', error);
                alert('Failed to add to favorites');
            });
    };

    const handleRemoveFavorite = () => {
        axios.delete(`http://localhost:8080/favorites/${userId}/${product.id}`)
            .then(response => {
                setIsFavorite(false);
                alert(response.data);
            })
            .catch(error => {
                console.error('Error removing favorite:', error);
                alert('Failed to remove from favorites');
            });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
    }, []);

    if (!product) {
        return <div>Đang tải thông tin sản phẩm...</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="card">
                    <div className="container-fluid">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                {product.image.startsWith('http') ? (
                <img src={product.image} className="img-fluid product-thumbnail" alt="Product" />
            ) : (
                <img src={require(`../images/product/${product.image}`)} className="img-fluid product-thumbnail" alt="Product" />
            )}
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title1" style={{ textAlign: 'left' }}>{product.nameP}</h3>
                                <p className="product-description" style={{ textAlign: 'left' }}>{product.description}</p>
                                <h4 className="price" style={{ textAlign: 'left' }}>Giá: <span>{product.price}.000 VNĐ</span></h4>
                                <p className="vote" style={{ textAlign: 'left' }}><strong>100%</strong> hàng <strong>Chất lượng</strong>,</p>
                                <div className="form-group" style={{ textAlign: 'left' }}>
                                            <label htmlFor="quantity">Số lượng đặt mua:</label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                min="1"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                            />
                                        </div>
                                        <br />
                                        <div className="action" style={{ textAlign: 'left' }}>
                                            <button type="button" className="add-to-cart btn btn-default" onClick={handleAddToCart}>
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
                    <FaHeart color={isFavorite ? 'red' : 'black'} />
                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phần đánh giá sản phẩm */}
                        <div className="tab-pane fade show active" id="tab-pane-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mb-4">{reviews.length} Đánh giá</h4>
                                    {reviews.map((review, index) => (
                                        <div className="media position-relative mb-4" key={index}>
                                            <div className="media-body">
                                                <h5>{review.user.fullName}<small> - <i>{review.createDate}</i></small></h5>
                                                <div className="text-primary mb-2">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <FontAwesomeIcon icon={solidStar} key={i} />
                                                    ))}
                                                    {[...Array(5 - review.rating)].map((_, i) => (
                                                        <FontAwesomeIcon icon={regularStar} key={i} />
                                                    ))}
                                                </div>
                                                <p>{review.comment}</p>
                                                {review.user.id === userId && (
                                            <a className="delete-button" onClick={() => handleDeleteReview(review.id)}>
                                                <FaTrash /> Xoá
                                            </a>
                                        )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-6">
                                    <h4 className="mb-4">Để lại đánh giá</h4>
                                    <small>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *</small>
                                    <div className="d-flex my-3">
                                        <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
                                        <div className="text-primary mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    icon={newReview.rating > i ? solidStar : regularStar}
                                                    className="star-icon"
                                                    onMouseEnter={() => handleRatingChange(i + 1)}
                                                    onMouseLeave={() => handleRatingChange(newReview.rating)}
                                                    onClick={() => handleRatingChange(i + 1)}
                                                    key={i}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="comment">Nội dung đánh giá *</label>
                                            <textarea id="comment" name="comment" cols="30" rows="5" className="form-control" value={newReview.comment} onChange={handleReviewChange} disabled={!canReview}></textarea>
                                        </div>
                                        <div className="form-group mb-0">
                                        <input
                                        type="submit"
                                        value="Để lại đánh giá"
                                        className="btn btn-primary px-3"
                                        disabled={!isLoggedIn || !canReview} // Chỉ cho phép đăng khi đã đăng nhập và có thể đánh giá
                                    />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                {!canReview && (
                    <div className="alert alert-info mt-4">
                        Bạn cần mua sản phẩm này để có thể đánh giá.
                    </div>
                )}
                    </div>
                    <Footer />
                </div>
            );
        }