package web.webbanbalo.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.webbanbalo.entity.Category;
import web.webbanbalo.entity.Product;

import java.util.List;

public interface ProductJpa extends JpaRepository<Product, Integer>{
    @Query("SELECT p FROM Product p WHERE p.category.id = :category_id")
    List<Product> findByCategory(@Param("category_id") int id);
}
