package com.pm.backend.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class WeeklyGoal extends Goal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "weeklyGoal", cascade = CascadeType.ALL)
    private List<DailyGoal> dailyGoals;

    @ManyToOne
    @JoinColumn(name = "monthly_goal_id")
    private MonthlyGoal monthlyGoal;


}
