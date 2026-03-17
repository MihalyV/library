package hu.vizsgaremek.LibraryCompanion.repository;


import hu.vizsgaremek.LibraryCompanion.model.ItemCopies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCopiesRepository extends JpaRepository<ItemCopies, Long> {
}
