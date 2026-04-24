package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.repository.ItemGenreRepository;
import hu.vizsgaremek.LibraryCompanion.specifaications.GenericSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemGenreService {
    private final ItemGenreRepository itemGenreRepository;

    public ItemGenreService(ItemGenreRepository itemGenreRepository) {
        this.itemGenreRepository = itemGenreRepository;
    }

    public List<ItemGenre> getAllItemGenres() {
        return itemGenreRepository.findAll();
    }

    public List<ItemGenre> filterGenres(String keyword) {
        Specification<ItemGenre> spec = Specification.where((Specification<ItemGenre>) null);

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and(GenericSpecifications.likeAttribute("genreType", keyword));
        }

        return itemGenreRepository.findAll(spec);
    }

    public ItemGenre saveItemGenre(ItemGenre itemGenre) {
        return itemGenreRepository.save(itemGenre);
    }

    public ItemGenre getItemGenreById(Long id) {
        return itemGenreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú item genre"));
    }

    public void deleteItemGenreById(Long id) {
        if (!itemGenreRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik item genre sem ilyen ID-val!");
        }
        itemGenreRepository.deleteById(id);
    }
}
