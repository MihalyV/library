package hu.vizsgaremek.LibraryCompanion.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "items")
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_ID")
    private Long itemId;

    @Column(name = "title", length = 128, nullable = false)
    private String title;

    @Column(name = "ISBN")
    private Integer ISBN;

    @ManyToOne
    @JoinColumn(name = "type_ID")
    private ItemType itemType;

    @ManyToMany
    @JoinTable(
            name = "genre_connect",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<ItemGenre> genres = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "author_connect",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "author_ID")
    )
    private Set<Authors> authors = new HashSet<>();

    @Column(name = "short_description", nullable = false, unique = true, columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "long_description", nullable = false, unique = true, columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "min_age", nullable = false)
    private Integer minAge;

    public Items() {
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getISBN() {
        return ISBN;
    }

    public void setISBN(Integer ISBN) {
        this.ISBN = ISBN;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }

    public Set<ItemGenre> getGenres() {
        return genres;
    }

    public void setGenres(Set<ItemGenre> genres) {
        this.genres = genres;
    }

    public Set<Authors> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Authors> authors) {
        this.authors = authors;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }
}
