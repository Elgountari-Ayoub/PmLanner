package com.pm.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(unique = true)
    protected String email;

    protected String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AnnualGoal> annualGoals;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<MonthlyGoal> monthlyGoals;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WeeklyGoal> weeklyGoals;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<DailyGoal> dailyGoals;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(this.getClass().getSimpleName().toUpperCase()));
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
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
