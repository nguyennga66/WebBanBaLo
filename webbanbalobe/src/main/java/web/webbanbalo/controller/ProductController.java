package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.Category;
import web.webbanbalo.entity.Product;
import web.webbanbalo.repository.CategoryRepository;
import web.webbanbalo.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    private CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepositoty, CategoryRepository categoryRepository) {
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


}
