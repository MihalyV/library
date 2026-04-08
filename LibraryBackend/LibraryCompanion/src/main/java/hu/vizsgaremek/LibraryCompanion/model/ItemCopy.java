package hu.vizsgaremek.LibraryCompanion.model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "item_copies")
public class ItemCopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "copy_ID")
    private Long copyId;

    @ManyToOne
    @JoinColumn(name = "item_ID", nullable = false)
    private Item item;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "condition", length = 255, nullable = false)
    private String condition;

    @Column(name = "date_of_purchase", nullable = false)
    private LocalDate dateOfPurchase;

    @ManyToOne
    @JoinColumn(name = "recorder_librarian_ID")
    private Worker recorderLibrarian;

    public ItemCopy() {
    }

    public Long getCopyId() {
        return copyId;
    }

    public void setCopyId(Long copyId) {
        this.copyId = copyId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public LocalDate getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(LocalDate dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Worker getRecorderLibrarian() {
        return recorderLibrarian;
    }

    public void setRecorderLibrarian(Worker recorderLibrarian) {
        this.recorderLibrarian = recorderLibrarian;
    }
}
