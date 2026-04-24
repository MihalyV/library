package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.service.ItemGenreService;
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

    @GetMapping("/filter")
    public ResponseEntity<List<ItemGenre>> filterGenres(@RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(itemGenreService.filterGenres(keyword));
    }
}
