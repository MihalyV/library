package hu.vizsgaremek.LibraryCompanion.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Engedélyezi a Spring Security szintű CORS-t (a WebConfig alapján)
                .csrf(csrf -> csrf.disable()) // API-k esetén a CSRF általában kikapcsolható (ha JWT-t használsz)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Nincs szerver oldali session
                .authorizeHttpRequests(auth -> auth
                                //.requestMatchers("/api/**/modificate").hasAnyRole("Librarian")
                                //.requestMatchers("/api/**/lending").hasAnyRole("Librarian","SubLibrarian")
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/registration").permitAll()
                                .requestMatchers("/logout").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/api/items/**").permitAll()
                                .requestMatchers("/api/**").permitAll()
                                .requestMatchers("/").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}