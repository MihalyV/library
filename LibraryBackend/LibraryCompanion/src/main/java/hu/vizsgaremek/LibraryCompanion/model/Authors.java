package hu.vizsgaremek.LibraryCompanion.model;

import jakarta.persistence.*;

@Entity
@Table(name = "authors")
public class Authors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_ID")
    private Long authorId;

    @Column(name = "author_name", length = 128)
    private String authorName;

    public Authors(Long authorId, String authorName) {
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
