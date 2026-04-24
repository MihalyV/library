package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.dto.ItemDTO;
import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.repository.ItemCopyRepository;
import hu.vizsgaremek.LibraryCompanion.repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}