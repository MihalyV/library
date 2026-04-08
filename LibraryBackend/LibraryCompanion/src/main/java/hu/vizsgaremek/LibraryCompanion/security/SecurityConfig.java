package hu.vizsgaremek.LibraryCompanion.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); //the type of encription
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/register", "/css/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("LIBRARIAN") //only librarians access it
                        .requestMatchers("/management/**").hasAnyRole("LIBRARIAN", "SUBLIBRARIAN") //only librarians and sublibrarians access it
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .defaultSuccessUrl("/home", true) //everyone gets sent here after logging in
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login") //everyone gets sent here after logging out
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .sessionManagement(session -> session
                        .maximumSessions(1) // you can be loggin in on one device at a time(changeble)
                );

        return http.build();
    }
}