package com.pm.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
public class MonthlyGoal extends Goal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "annual_goal_id")
    private AnnualGoal annualGoal;

    @OneToMany(mappedBy = "monthlyGoal", cascade = CascadeType.ALL)
    private List<WeeklyGoal> weeklyGoals;


}
