package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.repository.ItemsRepository;
import hu.vizsgaremek.LibraryCompanion.specifaications.GenericSpecifications;
import org.springframework.data.jpa.domain.Specification;
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

    public List<Item> filterItems(String title, Long genreId, Boolean featured) {
        Specification<Item> spec = Specification.where((Specification<Item>) null);

        if (title != null && !title.isEmpty())
            spec = spec.and(GenericSpecifications.likeAttribute("title", title));

        if (genreId != null)
            spec = spec.and((root, query, builder) ->
                    builder.equal(root.join("genres").get("genreId"), genreId));

        if (featured != null)
            spec = spec.and((root, query, builder) ->
                    builder.equal(root.get("featured"), featured));

        return itemsRepository.findAll(spec);
    }

    public Item getItemById(Long id) {
        return itemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú item"));
    }

    public List<Item> getFeaturedItems() {
        return itemsRepository.findByFeaturedTrue();
    }

    public Item saveItem(Item item) {
        return itemsRepository.save(item);
    }

    public void deleteItemById(Long id) {
        if (!itemsRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik item sem ilyen ID-val!");
        }
        itemsRepository.deleteById(id);
    }
}
