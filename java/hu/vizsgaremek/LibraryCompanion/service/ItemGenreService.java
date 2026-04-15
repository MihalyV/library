package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.repository.ItemGenreRepository;
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
        } else {
            itemGenreRepository.deleteById(id);
        }
    }
}
