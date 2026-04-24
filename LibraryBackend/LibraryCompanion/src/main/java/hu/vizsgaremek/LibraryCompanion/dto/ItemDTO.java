package hu.vizsgaremek.LibraryCompanion.dto;

import hu.vizsgaremek.LibraryCompanion.model.Author;
import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.model.ItemType;
import hu.vizsgaremek.LibraryCompanion.model.Item;

import java.util.Set;

public class ItemDTO {

    private Long itemId;
    private String title;
    private String ISBN;
    private boolean featured;
    private ItemType itemType;
    private Set<ItemGenre> genre;
    private Set<Author> author;
    private String shortDescription;
    private String longDescription;
    private Integer minAge;
    private String status;

    public ItemDTO(Item item, String status) {
        this.itemId = item.getItemId();
        this.title = item.getTitle();
        this.ISBN = item.getISBN();
        this.featured = item.isFeatured();
        this.itemType = item.getItemType();
        this.genre = item.getGenre();
        this.author = item.getAuthor();
        this.shortDescription = item.getShortDescription();
        this.longDescription = item.getLongDescription();
        this.minAge = item.getMinAge();
        this.status = status;
    }

    public Long getItemId() { return itemId; }
    public String getTitle() { return title; }
    public String getISBN() { return ISBN; }
    public boolean isFeatured() { return featured; }
    public ItemType getItemType() { return itemType; }
    public Set<ItemGenre> getGenre() { return genre; }
    public Set<Author> getAuthor() { return author; }
    public String getShortDescription() { return shortDescription; }
    public String getLongDescription() { return longDescription; }
    public Integer getMinAge() { return minAge; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}