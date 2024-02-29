package com.pm.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DailyGoal extends Goal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "weekly_goal_id")
    private WeeklyGoal weeklyGoal;


}
