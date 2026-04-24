package hu.vizsgaremek.LibraryCompanion.repository;

import hu.vizsgaremek.LibraryCompanion.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findAllByUser_Email(String email);
}