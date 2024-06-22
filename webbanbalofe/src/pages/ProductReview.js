import React, { useEffect, useState } from 'react';

export default function ProductReview({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}/reviews`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newReview }),
            });
            if (response.ok) {
                fetchReviews(); // Refresh reviews after submitting a new one
                setNewReview(''); // Clear the input
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="product-reviews">
            <h4>Đánh giá sản phẩm</h4>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>{review.content}</li>
                ))}
            </ul>
            <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                    <label htmlFor="newReview">Thêm đánh giá</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newReview"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Gửi</button>
            </form>
        </div>
    );
}