package hu.vizsgaremek.LibraryCompanion.repository;

import hu.vizsgaremek.LibraryCompanion.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Item, Long> {
}
