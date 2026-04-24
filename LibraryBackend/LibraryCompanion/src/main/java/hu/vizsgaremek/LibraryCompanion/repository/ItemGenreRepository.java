package hu.vizsgaremek.LibraryCompanion.repository;

import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemGenreRepository extends JpaRepository<ItemGenre, Long>, JpaSpecificationExecutor<ItemGenre> {}

