package hu.vizsgaremek.LibraryCompanion.model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "loans")
public class Loans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_ID")
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "user_ID", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "copy_ID", nullable = false)
    private ItemCopies itemCopy;

    @ManyToOne
    @JoinColumn(name = "librarian_ID", nullable = false)
    private Workers librarian;

    @Column(name = "loan_date", nullable = false)
    private LocalDate loanDate;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    public Loans() {
    }

    public long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public ItemCopies getItemCopy() {
        return itemCopy;
    }

    public void setItemCopy(ItemCopies itemCopy) {
        this.itemCopy = itemCopy;
    }

    public Workers getLibrarian() {
        return librarian;
    }

    public void setLibrarian(Workers librarian) {
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


