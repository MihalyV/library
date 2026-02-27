package hu.vizsgaremek.LibraryCompanion.model;

import jakarta.persistence.*;

@Entity
@Table(name = "action_type")
public class ActionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "action_Id")
    private Integer actionId;

    @Column(name = "action", nullable = false)
    private String action;

    public ActionType() {
    }

    public Integer getActionId() {
        return actionId;
    }

    public void setActionId(Integer actionId) {
        this.actionId = actionId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
