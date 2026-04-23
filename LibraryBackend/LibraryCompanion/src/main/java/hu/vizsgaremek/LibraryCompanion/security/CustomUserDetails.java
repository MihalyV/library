package hu.vizsgaremek.LibraryCompanion.security;

import hu.vizsgaremek.LibraryCompanion.model.Role;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private String firstName;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String email, String password, String firstName, Role role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
}

    public String getFirstName() {
        return firstName;
    }

    @Override
public String getPassword() {
    return password;
}

@Override
public String getUsername() {
    return email;
}

@Override
public boolean isAccountNonExpired() { return true; }

@Override
public boolean isAccountNonLocked() { return true; }

@Override
public boolean isCredentialsNonExpired() { return true; }

@Override
public boolean isEnabled() { return true; }
}
