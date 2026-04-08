package hu.vizsgaremek.LibraryCompanion.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_ID")
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "item_ID", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "action_ID", nullable = false)
    private ActionType actionType;

    @Column(name = "change_time", nullable = false)
    private LocalDateTime changeTime;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    public History() {
    }

    public long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public LocalDateTime getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(LocalDateTime changeTime) {
        this.changeTime = changeTime;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

}
