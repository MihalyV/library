package hu.vizsgaremek.LibraryCompanion.security;

import hu.vizsgaremek.LibraryCompanion.repository.UserRepository;
import hu.vizsgaremek.LibraryCompanion.repository.WorkerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;

    public CustomUserDetailsService(UserRepository userRepository, WorkerRepository workerRepository) {
        this.userRepository = userRepository;
        this.workerRepository = workerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(u -> new CustomUserDetails(u.getEmail(), u.getPassword(), u.getFirstName(), u.getRole()))
                .orElseGet(() -> workerRepository.findByWorkerEmail(email)
                        .map(w -> new CustomUserDetails(w.getWorkerEmail(), w.getPassword(), w.getFirstName(), w.getRole()))
                        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email))
                );
    }
}