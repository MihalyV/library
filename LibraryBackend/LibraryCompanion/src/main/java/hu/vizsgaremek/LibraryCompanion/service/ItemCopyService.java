package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopy;
import hu.vizsgaremek.LibraryCompanion.repository.ItemCopyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCopyService {
    private final ItemCopyRepository itemCopyRepository;

    public ItemCopyService(ItemCopyRepository itemCopyRepository) {
        this.itemCopyRepository = itemCopyRepository;
    }

    public List<ItemCopy> getAllItemCopies() {
        return itemCopyRepository.findAll();
    }

    public ItemCopy saveItemCopy(ItemCopy itemCopy) {
        return itemCopyRepository.save(itemCopy);
    }

    public ItemCopy getItemCopyById(Long id) {
        return itemCopyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú item copy"));
    }

    public void deleteItemCopyById(Long id) {
        if (!itemCopyRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik item copy sem ilyen ID-val!");
        } else {
            itemCopyRepository.deleteById(id);
        }
    }
}
