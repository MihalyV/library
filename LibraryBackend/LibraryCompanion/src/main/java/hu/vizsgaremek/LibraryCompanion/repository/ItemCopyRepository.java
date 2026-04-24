package hu.vizsgaremek.LibraryCompanion.repository;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemCopyRepository extends JpaRepository<ItemCopy, Long> {
    List<ItemCopy> findByItem_ItemIdAndStatus(Long itemId, String status);
}