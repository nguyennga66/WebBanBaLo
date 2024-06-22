import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import "../css/bootstrap.min.css";
import "../css/tiny-slider.css";
import "../css/style.css";
import "../css/product-detail.css";


export default function ProductDetail() {
    const { id } = useParams();
    console.log('ID sản phẩm từ URL:', id);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: '',
        name: '',
        email: ''
    });
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserId(user.id);
        }
    }, []);


    useEffect(() => {
        fetch(`http://localhost:8080/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API để lấy chi tiết sản phẩm:', error);
            });
    }, [id]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setIsLoggedIn(true);
          setUserId(user.id);
          console.log("useEffect is called");
        }
    }, []);

    useEffect(() => {

        fetch(`http://localhost:8080/reviews/${id}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API để lấy đánh giá sản phẩm:', error);
            });
    }, [id]);

    const handleQuantityChange = (event) => {
        const quantityValue = parseInt(event.target.value);
        setQuantity(quantityValue > 0 ? quantityValue : 1);
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            window.location.href = `/cart/${userId}`;
        } else {
            window.location.href = '/signin';
            return;
        }

        const cartItem = {
            cart: { user: { id: userId } },
            product: { id: product.id },
            quantity: quantity
        };

        fetch('http://localhost:8080/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                alert(data);
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
        const reviewData = {
            user: { id: userId },
            product: { id: product.id },
            rating: newReview.rating,
            comment: newReview.comment,
            name: newReview.name,
            email: newReview.email
        };

        fetch('http://localhost:8080/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setReviews([...reviews, data]);
                setNewReview({ rating: 0, comment: '', name: '', email: '' });
            })
            .catch(error => {
                console.error('Lỗi khi gửi đánh giá:', error);
                setError('Có lỗi xảy ra khi gửi đánh giá');
            });
    };

    const handleRatingChange = (rating) => {
        setNewReview({ ...newReview, rating });
    };

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (isLoggedIn) {
                try {
                    const response = await fetch(`http://localhost:8080/favorites/${userId}`);
                    if (response.ok) {
                        const favorites = await response.json();
                        const isProductFavorited = favorites.some(favorite => favorite.product.id === parseInt(id));
                        setIsFavorite(isProductFavorited);
                    } else {
                        setIsFavorite(false);
                    }
                } catch (error) {
                    console.error('Error checking if product is favorited:', error);
                    setIsFavorite(false);
                }
            }
        };

        checkIfFavorite();
    }, [isLoggedIn, userId, id]);

    // Handlers for adding and removing favorites
    const handleAddFavorite = () => {
        const favoriteData = {
            user: { id: userId },
            product: { id: product.id }
        };

        fetch('http://localhost:8080/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favoriteData)
        })
        .then(response => response.text())
        .then(data => {
            setIsFavorite(true);
            alert(data); // Replace with proper notification handling
        })
        .catch(error => {
            console.error('Error adding favorite:', error);
            alert('Failed to add to favorites'); // Replace with proper error handling
        });
    };

    const handleRemoveFavorite = () => {
        fetch(`http://localhost:8080/favorites/${userId}/${product.id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            setIsFavorite(false);
            alert(data); // Replace with proper notification handling
        })
        .catch(error => {
            console.error('Error removing favorite:', error);
            alert('Failed to remove from favorites'); // Replace with proper error handling
        });
    };

    const handleReviewChange = (event) => {
        const { name, value } = event.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        const reviewData = {
            user: { id: userId },
            product: { id: product.id },
            rating: newReview.rating,
            comment: newReview.comment,
            name: newReview.name,
            email: newReview.email
        };
        fetch('http://localhost:8080/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => response.json())
        .then(data => {
            setReviews([...reviews, data]);
            setNewReview({ rating: 0, comment: '', name: '', email: '' });
        })
        .catch(error => {
            console.error('Lỗi khi gửi đánh giá:', error);
            alert('Có lỗi xảy ra khi gửi đánh giá');
        });
    };

    const handleRatingChange = (rating) => {
        setNewReview({ ...newReview, rating });
    };

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
                                    <div className="tab-pane active" id="pic-1">
                                        <img src={require(`../images/product/${product.image}`)} alt="Product" style={{ width: '350px', height: '310px' }} />
                                    </div>
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
                                        <div className="media mb-4" key={index}>
                                            <div className="media-body">
                                                <h6>{review.user.fullName}<small> - <i>{review.createDate}</i></small></h6>
                                                <div className="text-primary mb-2">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <FontAwesomeIcon icon={solidStar} className="star-icon rated" key={i} />
                                                    ))}
                                                    {[...Array(5 - review.rating)].map((_, i) => (
                                                        <FontAwesomeIcon icon={regularStar} className="star-icon" key={i} />
                                                    ))}
                                                </div>
                                                <p>{review.comment}</p>
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
                                            <label htmlFor="comment">Đánh giá của bạn *</label>
                                            <textarea id="comment" name="comment" cols="30" rows="5" className="form-control" value={newReview.comment} onChange={handleReviewChange}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Tên của bạn *</label>
                                            <input type="text" className="form-control" id="name" name="name" value={newReview.name} onChange={handleReviewChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email của bạn *</label>
                                            <input type="email" className="form-control" id="email" name="email" value={newReview.email} onChange={handleReviewChange} />
                                        </div>
                                        <div className="form-group mb-0">
                                            <input type="submit" value="Gửi đánh giá của bạn" className="btn btn-primary px-3" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
);
}
