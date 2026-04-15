package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Loan;
import hu.vizsgaremek.LibraryCompanion.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sikertelen lekérés, nem rendelkezik egyik kölcsönzés sem ilyen ID-val!"));
    }

    public void deleteLoanById(Long id) {
        if (!loanRepository.existsById(id)) {
            throw new RuntimeException("Sikertelen törlés, nem rendelkezik egyik kölcsönzés sem ilyen ID-val!");
        } else {
            loanRepository.deleteById(id);
        }
    }
}
