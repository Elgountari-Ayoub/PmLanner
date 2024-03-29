package com.pm.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;


@Setter
@Getter
@Entity
public class AnnualGoal extends Goal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "annualGoal", cascade = CascadeType.ALL)
    private List<MonthlyGoal> monthlyGoals;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
