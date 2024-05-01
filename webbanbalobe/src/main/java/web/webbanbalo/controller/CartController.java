    package web.webbanbalo.controller;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import web.webbanbalo.entity.Cart;
    import web.webbanbalo.entity.CartItem;
    import web.webbanbalo.entity.Product;
    import web.webbanbalo.entity.User;
    import web.webbanbalo.repository.CartItemRepository;
    import web.webbanbalo.repository.CartRepository;
    import web.webbanbalo.repository.ProductRepository;
    import web.webbanbalo.repository.UserRepository;

    import java.util.Optional;

    @CrossOrigin(origins = "http://localhost:3000")
    @RestController
    public class CartController {

        @Autowired
        private CartItemRepository cartItemRepository;

        @Autowired
        private CartRepository cartRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private UserRepository userRepository;

        @PostMapping("/cart/add")
        public ResponseEntity<String> addToCart(@RequestBody CartItem cartItemRequest) {
            // Kiểm tra xem người dùng có tồn tại không
            User user = userRepository.findById(cartItemRequest.getCart().getUser().getId());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Kiểm tra xem sản phẩm có tồn tại không
            Product product = productRepository.findById(cartItemRequest.getProduct().getId()).orElse(null);
            if (product == null) {
                return ResponseEntity.badRequest().body("Product not found");
            }

            // Kiểm tra xem giỏ hàng của người dùng có tồn tại không
            Cart cart = cartRepository.findByUser(user);
            if (cart == null) {
                // Nếu không có giỏ hàng, tạo một giỏ hàng mới cho người dùng
                cart = new Cart();
                cart.setUser(user);
                cartRepository.save(cart);
            }

            // Kiểm tra xem mục giỏ hàng có tồn tại không
            CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product).orElse(null);
            if (cartItem == null) {
                // Nếu không có mục giỏ hàng, tạo mới
                cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(cartItemRequest.getQuantity());
            } else {
                // Nếu có mục giỏ hàng, cập nhật số lượng
                cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
            }

            // Lưu mục giỏ hàng vào cơ sở dữ liệu
            cartItemRepository.save(cartItem);

            // Trả về phản hồi thành công
            return ResponseEntity.ok("Product added to cart");
        }

        @PostMapping("/cart/update")
        public ResponseEntity<String> updateCart(@RequestBody CartItem cartItemRequest) {
            // Kiểm tra xem người dùng có tồn tại không
            User user = userRepository.findById(cartItemRequest.getCart().getUser().getId());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Kiểm tra xem sản phẩm có tồn tại không
            Product product = productRepository.findById(cartItemRequest.getProduct().getId()).orElse(null);
            if (product == null) {
                return ResponseEntity.badRequest().body("Product not found");
            }

            // Kiểm tra xem giỏ hàng của người dùng có tồn tại không
            Cart cart = cartRepository.findByUser(user);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Cart not found");
            }

            // Tìm mục giỏ hàng để cập nhật số lượng
            Optional<CartItem> optionalCartItem = cartItemRepository.findByCartAndProduct(cart, product);
            if (!optionalCartItem.isPresent()) {
                return ResponseEntity.badRequest().body("Cart item not found");
            }

            CartItem cartItem = optionalCartItem.get();
            // Cập nhật số lượng của mục giỏ hàng
            cartItem.setQuantity(cartItemRequest.getQuantity());

            // Lưu thay đổi vào cơ sở dữ liệu
            cartItemRepository.save(cartItem);

            // Trả về phản hồi thành công
            return ResponseEntity.ok("Cart item updated");
        }

    }
