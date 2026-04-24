package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.dto.RegisterRequest;
import hu.vizsgaremek.LibraryCompanion.model.User;
import hu.vizsgaremek.LibraryCompanion.model.Worker;
import hu.vizsgaremek.LibraryCompanion.model.Role;
import hu.vizsgaremek.LibraryCompanion.config.JwtUtil;
import hu.vizsgaremek.LibraryCompanion.security.CustomUserDetails;
import hu.vizsgaremek.LibraryCompanion.security.CustomUserDetailsService;
import hu.vizsgaremek.LibraryCompanion.service.UserService;
import hu.vizsgaremek.LibraryCompanion.service.WorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final WorkerService workerService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(UserService userService, WorkerService workerService,
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                          CustomUserDetailsService userDetailsService) {
        this.userService = userService;
        this.workerService = workerService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                String token = jwtUtil.generateToken(email);
                String role = userDetails.getAuthorities().iterator().next().getAuthority();
                String firstName = ((CustomUserDetails) userDetails).getFirstName();

                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "role", role,
                        "email", email,
                        "firstName", firstName
                ));
            }
            return ResponseEntity.status(401).body(Map.of("message", "Hibás jelszó!"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Felhasználó nem található!"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if ("LIBRARIAN".equals(request.getRole())) {
                Worker worker = new Worker();
                worker.setLastName(request.getLastName());
                worker.setFirstName(request.getFirstName());
                worker.setWorkerEmail(request.getEmail());
                worker.setPhoneNumber(request.getPhoneNumber());
                worker.setPassword(passwordEncoder.encode(request.getPassword()));
                worker.setRegDate(LocalDate.now());
                worker.setRole(Role.ROLE_SUBLIBRARIAN);

                workerService.saveWorker(worker);
            } else {
                User user = new User();
                user.setLastName(request.getLastName());
                user.setFirstName(request.getFirstName());
                user.setEmail(request.getEmail());
                user.setPhoneNumber(request.getPhoneNumber());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setRegDate(LocalDate.now());
                user.setRole(Role.ROLE_USER);

                userService.saveUser(user);
            }

            return ResponseEntity.ok(Map.of("message", "Sikeres regisztráció!"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Hiba a regisztráció során: " + e.getMessage()));
        }
    }
}