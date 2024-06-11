package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.BillDetail;
import web.webbanbalo.entity.Category;
import web.webbanbalo.entity.Product;
import web.webbanbalo.entity.View;
import web.webbanbalo.repository.BillDetailRepository;
import web.webbanbalo.repository.CategoryRepository;
import web.webbanbalo.repository.ProductRepository;
import web.webbanbalo.repository.ViewRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    private CategoryRepository categoryRepository;

    @Autowired
    private ViewRepository viewRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/products")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        // Kiểm tra `product.getCategory()` có trả về `null` không
        if (product.getCategory() == null || product.getCategory().getNameC() == null) {
            // Trả về lỗi nếu dữ liệu không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Product must have a category with a valid name.");
        }

        // Tìm category dựa trên tên
        Category cate = categoryRepository.findByNameCategory(product.getCategory().getNameC());

        if (cate == null) {
            // Trả về lỗi nếu category không tồn tại
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Category with name '" + product.getCategory().getNameC() + "' does not exist.");
        }

        // Gán category cho product
        product.setCategory(cate);

        // Lưu product
        Product addedProd = productRepository.save(product);

        // Trả về mã trạng thái 201 CREATED khi lưu thành công
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Product created successfully with ID: " + addedProd.getId());
    }

    @GetMapping("/products")
    public Page<Product> getProducts(Pageable pageable) {
        // Trả về danh sách sản phẩm phân trang
        return productRepository.findAll(pageable);
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        Product prod = productRepository.findById(id).get();
        return prod;
    }

    @GetMapping("/products/category/{id}")
    public ResponseEntity<Page<Product>> getProductsByCategory(
            @PathVariable int id, Pageable pageable
    ) {
        Page<Product> products = productRepository.findByCategoryId(id, pageable);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product existingProduct = optionalProduct.get();

        existingProduct.setNameP(updatedProduct.getNameP());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setImage(updatedProduct.getImage());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setCategory(updatedProduct.getCategory());

        Category updatedCategory = updatedProduct.getCategory();
        if (updatedCategory != null) {
            Category existingCategory = categoryRepository.findByNameCategory(updatedCategory.getNameC());
            if (existingCategory == null) {
                return ResponseEntity.badRequest().body("Category not found");
            }
            existingProduct.setCategory(existingCategory);
        }

        productRepository.save(existingProduct);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product productToDelete = optionalProduct.get();
        productRepository.delete(productToDelete);

        return ResponseEntity.noContent().build();
    }


    @GetMapping("/products/search")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Product> products = productRepository.findByNamePContainingIgnoreCase(search, PageRequest.of(page, size));
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/category/{categoryId}/search")
    public ResponseEntity<Page<Product>> searchProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Product> products = productRepository.findByNamePContainingIgnoreCaseAndCategoryId(search, categoryId, PageRequest.of(page, size));
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/filter")
    public ResponseEntity<Page<Product>> searchProductsByCategory(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        Double min = minPrice != null ? minPrice : 0.0;
        Double max = maxPrice != null ? maxPrice : Double.MAX_VALUE;

        Page<Product> products = productRepository.findByNamePContainingIgnoreCaseAndPriceBetween(
                search, min, max, PageRequest.of(page, size));
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/category/{categoryId}/filter")
    public ResponseEntity<Page<Product>> searchProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        Double min = minPrice != null ? minPrice : 0.0;
        Double max = maxPrice != null ? maxPrice : Double.MAX_VALUE;

        Page<Product> products = productRepository.findByCategoryIdAndNamePContainingIgnoreCaseAndPriceBetween(
                categoryId, search, min, max, PageRequest.of(page, size));
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/sort")
    public ResponseEntity<Page<Product>> getProductsSortedByPrice(
            @RequestParam(defaultValue = "asc") String sort,
            Pageable pageable
    ) {
        Page<Product> products;
        if (sort.equals("asc")) {
            products = productRepository.findAllByOrderByPriceAsc(pageable);
        } else {
            products = productRepository.findAllByOrderByPriceDesc(pageable);
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/category/{categoryId}/sort")
    public ResponseEntity<Page<Product>> getProductsByCategorySortedByPrice(
            @PathVariable int categoryId,
            @RequestParam(defaultValue = "asc") String sort,
            Pageable pageable
    ) {
        Page<Product> products;
        if (sort.equals("asc")) {
            products = productRepository.findByCategoryIdOrderByPriceAsc(categoryId, pageable);
        } else {
            products = productRepository.findByCategoryIdOrderByPriceDesc(categoryId, pageable);
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}/views")
    public int getViewCount(@PathVariable int id) {
        View viewCount = viewRepository.findByProductId(id);
        return viewCount != null ? viewCount.getViewCount() : 0;
    }

    @PostMapping("/products/{id}/view")
    public void incrementViewCount(@PathVariable int id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        View viewCount = viewRepository.findByProductId(id);
        if (viewCount == null) {
            viewCount = new View();
            viewCount.setProduct(product);
            viewCount.setViewCount(0);
        }
        viewCount.setViewCount(viewCount.getViewCount() + 1);
        viewRepository.save(viewCount);
    }

    @GetMapping("/products/{id}/purchases")
    public int getPurchaseCount(@PathVariable int id) {
        List<BillDetail> billDetails = billDetailRepository.findByProductId(id);
        return billDetails.stream().mapToInt(BillDetail::getQuantity).sum();
    }
}
