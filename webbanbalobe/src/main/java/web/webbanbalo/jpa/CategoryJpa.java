package web.webbanbalo.jpa;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.webbanbalo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryJpa extends JpaRepository<Category, Integer>{
    @Query("SELECT c FROM Category c WHERE c.nameC = :nameC")
    Category findByNameCategory(@Param("nameC") String nameC);
}
