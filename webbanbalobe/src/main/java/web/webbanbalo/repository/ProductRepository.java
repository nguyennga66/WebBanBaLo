package web.webbanbalo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.webbanbalo.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    @Query("SELECT p FROM Product p WHERE p.category.id = :category_id")
    List<Product> findByCategory(@Param("category_id") int id);

    // Phương thức để lấy dữ liệu phân trang
    Page<Product> findAll(Pageable pageable);

    // Phương thức để tìm sản phẩm theo danh mục
    Page<Product> findByCategoryId(int categoryId, Pageable pageable);
}
