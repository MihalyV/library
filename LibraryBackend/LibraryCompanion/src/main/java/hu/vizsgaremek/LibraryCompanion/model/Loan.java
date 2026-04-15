package hu.vizsgaremek.LibraryCompanion.model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_ID")
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "user_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "copy_ID", nullable = false)
    private ItemCopies itemCopies;

    @ManyToOne
    @JoinColumn(name = "librarian_ID", nullable = false)
    private Worker librarian;

    @Column(name = "loan_date", nullable = false)
    private LocalDate loanDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    public Loan() {
    }

    public long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ItemCopies getItemCopy() {
        return itemCopies;
    }

    public void setItemCopy(ItemCopies itemCopies) {
        this.itemCopies = itemCopies;
    }

    public Worker getLibrarian() {
        return librarian;
    }

    public void setLibrarian(Worker librarian) {
        this.librarian = librarian;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
}


