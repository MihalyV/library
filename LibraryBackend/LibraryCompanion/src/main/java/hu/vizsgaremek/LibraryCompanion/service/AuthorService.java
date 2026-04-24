package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Author;
import hu.vizsgaremek.LibraryCompanion.repository.AuthorRepository;
import hu.vizsgaremek.LibraryCompanion.specifaications.GenericSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public List<Author> filterAuthors(String name) {
        Specification<Author> spec = Specification.where((Specification<Author>) null);
        if (name != null && !name.isEmpty())
            spec = spec.and(GenericSpecifications.likeAttribute("authorName", name));
        return authorRepository.findAll(spec);
    }

    public Author getAuthorById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nem található ilyen ID-jú szerző"));
    }

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
}

