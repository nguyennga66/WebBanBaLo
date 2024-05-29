package web.webbanbalo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanbalo.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {
}