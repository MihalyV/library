package hu.vizsgaremek.LibraryCompanion.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "item_genre")
public class ItemGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_ID")
    private Long genreId;

    @Column(name = "genre_type", length = 45, nullable = false)
    private String genreType;

    @ManyToMany(mappedBy = "genres")
    private Set<Item> items = new HashSet<>();

    public ItemGenre() {
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public String getGenreType() {
        return genreType;
    }

    public void setGenreType(String genreType) {
        this.genreType = genreType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemGenre that = (ItemGenre) o;
        return Objects.equals(genreId, that.genreId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(genreId);
    }
}
