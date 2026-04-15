package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopies;
import hu.vizsgaremek.LibraryCompanion.model.ItemCopies;
import hu.vizsgaremek.LibraryCompanion.repository.ItemCopyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCopyService {
    private final ItemCopyRepository itemCopyRepository;

    public ItemCopyService(ItemCopyRepository itemCopyRepository) {
        this.itemCopyRepository = itemCopyRepository;
    }

    public List<ItemCopies> getAllItemCopies() {
        return itemCopyRepository.findAll();
    }

    public ItemCopies saveItemCopy(ItemCopies itemCopy) {
        return itemCopyRepository.save(itemCopy);
    }

    public ItemCopies getItemCopyById(Long id) {
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
