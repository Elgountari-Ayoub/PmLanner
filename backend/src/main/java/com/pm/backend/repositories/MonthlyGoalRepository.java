package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.MonthlyGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthlyGoalRepository extends JpaRepository<MonthlyGoal, Long> {
}
