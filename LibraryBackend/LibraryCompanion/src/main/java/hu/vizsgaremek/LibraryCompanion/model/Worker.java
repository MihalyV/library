package hu.vizsgaremek.LibraryCompanion.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "workers")
public class Worker {

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.ROLE_SUBLIBRARIAN;

    public Role getRole(){
        return role;
    }

    public void setRole(Role role){
        this.role = role;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_ID")
    private Long workerId;

    @Column(name = "phone_number", length = 15, nullable = false)
    private String phoneNumber;

    @Column(name = "worker_email", length = 255, nullable = false, unique = true)
    private String workerEmail;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "reg_date")
    private LocalDate regDate;

    @JsonIgnore
    @Column(name = "password", length = 60)
    private String password;

    public Worker() {
    }

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getWorkerEmail() {
        return workerEmail;
    }

    public void setWorkerEmail(String workerEmail) {
        this.workerEmail = workerEmail;
    }

    public LocalDate getRegDate() {
        return regDate;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setRegDate(LocalDate regDate) {
        this.regDate = regDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
