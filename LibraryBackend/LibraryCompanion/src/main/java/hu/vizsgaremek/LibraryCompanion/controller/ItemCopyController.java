package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.model.ItemCopies;
import hu.vizsgaremek.LibraryCompanion.service.ItemCopyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item-copies")
public class ItemCopyController {
    private final ItemCopyService itemCopyService;

    public ItemCopyController(ItemCopyService itemCopyService) {
        this.itemCopyService = itemCopyService;
    }

    @GetMapping
    public ResponseEntity<List<ItemCopies>> getAllItemCopies() {
        return ResponseEntity.ok(itemCopyService.getAllItemCopies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCopies> getItemCopyById(@PathVariable Long id) {
        return ResponseEntity.ok(itemCopyService.getItemCopyById(id));
    }

    @PostMapping
    public ResponseEntity<ItemCopies> createItemCopy(@RequestBody ItemCopies itemCopies) {
        ItemCopies newItemCopy = itemCopyService.saveItemCopy(itemCopies);
        return new ResponseEntity<>(newItemCopy, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemById(@PathVariable Long id) {
        itemCopyService.deleteItemCopyById(id);
        return ResponseEntity.noContent().build();
    }
}
