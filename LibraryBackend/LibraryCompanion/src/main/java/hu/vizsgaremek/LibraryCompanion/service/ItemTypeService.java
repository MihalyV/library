package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemCopy;
import hu.vizsgaremek.LibraryCompanion.model.ItemType;
import hu.vizsgaremek.LibraryCompanion.repository.ItemTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemTypeService {
    private final ItemTypeRepository itemTypeRepository;

    public ItemTypeService(ItemTypeRepository itemTypeRepository) {
        this.itemTypeRepository = itemTypeRepository;
    }

    public List<ItemType> getAllItemTypes() {
        return itemTypeRepository.findAll();
    }

    public ItemType saveItemType(ItemType itemType) {
        return itemTypeRepository.save(itemType);
    }

    public void deleteItemTypeById(Long id) {
        if (!itemTypeRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik item type sem ilyen ID-val!");
        } else {
            itemTypeRepository.deleteById(id);
        }
    }
}
