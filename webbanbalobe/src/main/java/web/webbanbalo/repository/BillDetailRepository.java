package web.webbanbalo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanbalo.entity.BillDetail;

public interface BillDetailRepository extends JpaRepository<BillDetail, Integer> {
}