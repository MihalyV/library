package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopy;
import hu.vizsgaremek.LibraryCompanion.model.Loan;
import hu.vizsgaremek.LibraryCompanion.model.User;
import hu.vizsgaremek.LibraryCompanion.model.Worker;
import hu.vizsgaremek.LibraryCompanion.repository.ItemCopyRepository;
import hu.vizsgaremek.LibraryCompanion.repository.LoanRepository;
import hu.vizsgaremek.LibraryCompanion.repository.UserRepository;
import hu.vizsgaremek.LibraryCompanion.repository.WorkerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final ItemCopyRepository itemCopyRepository;
    private final WorkerRepository workerRepository;

    public LoanService(LoanRepository loanRepository, UserRepository userRepository,
                       ItemCopyRepository itemCopyRepository, WorkerRepository workerRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.itemCopyRepository = itemCopyRepository;
        this.workerRepository = workerRepository;
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public List<Loan> getMyLoans(String email) {
        return loanRepository.findAllByUser_Email(email);
    }

    @Transactional
    public Loan borrowItem(Long itemId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Felhasználó nem található!"));

        List<ItemCopy> availableCopies = itemCopyRepository.findByItem_ItemIdAndStatus(itemId, "Elérhető");

        if (availableCopies.isEmpty()) {
            throw new RuntimeException("Sajnos jelenleg nincs elérhető példány ebből a tételből!");
        }

        ItemCopy copyToBorrow = availableCopies.get(0);

        Worker systemLibrarian = workerRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Rendszerhiba: Alapértelmezett könyvtáros nem található!"));

        Loan newLoan = new Loan();
        newLoan.setUser(user);
        newLoan.setItemCopy(copyToBorrow);
        newLoan.setLibrarian(systemLibrarian);
        newLoan.setLoanDate(LocalDate.now());
        newLoan.setDueDate(LocalDate.now().plusDays(30));

        copyToBorrow.setStatus("Kikölcsönözve");
        itemCopyRepository.save(copyToBorrow);

        return loanRepository.save(newLoan);
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú kölcsönzés!"));
    }

    public void deleteLoanById(Long id) {
        loanRepository.deleteById(id);
    }

    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }
}