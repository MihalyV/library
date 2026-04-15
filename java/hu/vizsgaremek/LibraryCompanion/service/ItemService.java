package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.repository.ItemsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemsRepository itemsRepository;

    public ItemService(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    public List<Item> getAllItems() {
        return itemsRepository.findAll();
    }

    public Item saveItem(Item item) {
        return itemsRepository.save(item);
    }

    public Item getItemById(Long id) {
        return itemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú item"));
    }

    public List<Item> getFeaturedItems() {
        return itemsRepository.findByFeaturedTrue();
    }

    public void deleteItemById(Long id) {
        if (!itemsRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik item sem ilyen ID-val!");
        } else {
            itemsRepository.deleteById(id);
        }
    }


}
