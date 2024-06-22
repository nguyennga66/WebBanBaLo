package web.webbanbalo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanbalo.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    Page<Bill> findByUserId(int userId, Pageable pageable);
}