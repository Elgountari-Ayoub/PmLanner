package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.WeeklyGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, Long> {
}
