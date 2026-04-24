package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.User;
import hu.vizsgaremek.LibraryCompanion.repository.UserRepository;
import hu.vizsgaremek.LibraryCompanion.specifaications.GenericSpecifications;
import org.springframework.data.jpa.domain.PredicateSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> filterUsers(String name, String email, LocalDate registeredAfter) {
        Specification<User> spec = Specification.where((Specification<User>) null);

        if (name != null && !name.isEmpty()) {
            spec = spec.and((PredicateSpecification<User>) GenericSpecifications.likeAttribute("firstName", name)
                    .or(GenericSpecifications.likeAttribute("lastName", name)));
        }
        if (email != null && !email.isEmpty())
            spec = spec.and(GenericSpecifications.likeAttribute("email", email));
        if (registeredAfter != null)
            spec = spec.and(GenericSpecifications.greaterThan("regDate", registeredAfter));

        return userRepository.findAll(spec);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nem rendelkezik egyik felhasználó sem ilyen ID-val!"));
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}

