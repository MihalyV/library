package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.dto.ItemDTO;
import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.model.ItemType;
import hu.vizsgaremek.LibraryCompanion.repository.ItemCopyRepository;
import hu.vizsgaremek.LibraryCompanion.repository.ItemsRepository;
import hu.vizsgaremek.LibraryCompanion.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemsRepository itemsRepository;

    @Autowired
    private ItemCopyRepository itemCopyRepository;

    @GetMapping
    public List<ItemDTO> getAllItems() {
        List<Item> items = itemsRepository.findAll();

        return items.stream()
                .map(item -> {
                    boolean hasAvailable = !itemCopyRepository
                            .findByItem_ItemIdAndStatus(item.getItemId(), "Elérhető")
                            .isEmpty();
                    String status = hasAvailable ? "Elérhető" : "Nem elérhető";
                    return new ItemDTO(item, status);
                })
                .collect(Collectors.toList());
    }

    private final ItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

        @GetMapping("/filter")
        public ResponseEntity<List<ItemDTO>> filterItems(
                @RequestParam(required = false) String title,
                @RequestParam(required = false) Long genreId,
                @RequestParam(required = false) Boolean featured) {

            List<Item> filteredItems = itemService.filterItems(title, genreId, featured);
            var items = filteredItems.stream()
                    .map(item -> new ItemDTO(item, "Elérhető"))
                    .toList();
            return ResponseEntity.ok(items);
        }

    @GetMapping("/featured")
    public ResponseEntity<List<ItemDTO>> getFeaturedItems() {
        List<Item> featuredItems = itemService.getFeaturedItems();
        var items = featuredItems.stream()
                .map(item -> new ItemDTO(item, "Elérhető"))
                .toList();
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }
}

