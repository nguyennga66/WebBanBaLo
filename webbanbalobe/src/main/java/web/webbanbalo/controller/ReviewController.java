package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.Review;
import web.webbanbalo.repository.ReviewRepository;
import web.webbanbalo.repository.UserRepository;
import web.webbanbalo.repository.ProductRepository;

import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Tạo mới một đánh giá
    @CrossOrigin(origins = "*")
    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Xác nhận user và product tồn tại
        if (userRepository.existsById(review.getUser().getId()) &&
                productRepository.existsById(review.getProduct().getId())) {
            Review savedReview = reviewRepository.save(review);
            return ResponseEntity.ok(savedReview);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}

