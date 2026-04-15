package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.service.ItemGenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item-genres")
public class ItemGenreController {
    private final ItemGenreService itemGenreService;

    public ItemGenreController(ItemGenreService itemGenreService) {
        this.itemGenreService = itemGenreService;
    }

    @GetMapping
    public ResponseEntity<List<ItemGenre>> getAllGenres() {
        return ResponseEntity.ok(itemGenreService.getAllItemGenres());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemGenre> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemGenreService.getItemGenreById(id));
    }

    @PostMapping
    public ResponseEntity<ItemGenre> createItem(@RequestBody ItemGenre itemGenre) {
        ItemGenre newItemGenre = itemGenreService.saveItemGenre(itemGenre);
        return new ResponseEntity<>(newItemGenre, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemById(@PathVariable Long id) {
        itemGenreService.deleteItemGenreById(id);
        return ResponseEntity.noContent().build();
    }
}
