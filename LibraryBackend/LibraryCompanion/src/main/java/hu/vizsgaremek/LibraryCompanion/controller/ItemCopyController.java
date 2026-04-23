package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopy;
import hu.vizsgaremek.LibraryCompanion.service.ItemCopyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item-copy")
public class ItemCopyController {
    private final ItemCopyService itemCopyService;

    public ItemCopyController(ItemCopyService itemCopyService) {
        this.itemCopyService = itemCopyService;
    }

    @GetMapping
    public ResponseEntity<List<ItemCopy>> getAllItemCopies() {
        return ResponseEntity.ok(itemCopyService.getAllItemCopies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCopy> getItemCopyById(@PathVariable Long id) {
        return ResponseEntity.ok(itemCopyService.getItemCopyById(id));
    }

    @PostMapping
    public ResponseEntity<ItemCopy> createItemCopy(@RequestBody ItemCopy itemCopies) {
        ItemCopy newItemCopy = itemCopyService.saveItemCopy(itemCopies);
        return new ResponseEntity<>(newItemCopy, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemById(@PathVariable Long id) {
        itemCopyService.deleteItemCopyById(id);
        return ResponseEntity.noContent().build();
    }
}
