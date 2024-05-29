package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.*;
import web.webbanbalo.repository.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BillDetailController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;
    @CrossOrigin(origins = "*")
    @PostMapping("/createBill")
    public ResponseEntity<String> createBillDetail(@RequestBody Bill bill) {
        // Kiểm tra xem đối tượng CartItem có chứa một đối tượng Cart hợp lệ không
        Cart cart = bill.getCart();

        int userId = cart.getUser().getId();
        // Kiểm tra xem người dùng có tồn tại không
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Kiểm tra xem giỏ hàng của người dùng có tồn tại không
        Cart existingCart = cartRepository.findByUser(user);

        List<Product> products = bill.getProducts();
        for (Product product : products) {
            product = productRepository.findById(product.getId()).orElse(null);
            if (product == null) {
                return ResponseEntity.badRequest().body(null); // hoặc xử lý lỗi phù hợp
            }
        }
//        BillDetail savedBillDetail = billDetailRepository.save(billDetail);

        // Lưu vào cơ sở dữ liệu
        bill.setCart(existingCart);
        billDetailRepository.save(bill);

        // Lấy danh sách các mục trong giỏ hàng của người dùng
        List<CartItem> cartItems = cartItemRepository.findByCart(existingCart);
        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("No items in cart");
        }

        // Xóa tất cả các mục trong giỏ hàng
        cartItemRepository.deleteAll(cartItems);

        return ResponseEntity.ok().body("Hóa đơn được tạo thành công.");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/bills")
    public ResponseEntity<?> getBillDetails(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Bill> billDetailsPage = billDetailRepository.findAll(pageable);
        return ResponseEntity.ok(billDetailsPage);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/bills/{billId}")
    public ResponseEntity<?> getBillDetail(@PathVariable int billId) {
        Optional<Bill> billDetail = billDetailRepository.findById(billId);
        if (billDetail.isPresent()) {
            return ResponseEntity.ok(billDetail.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hóa đơn không tồn tại.");
        }
    }
}



