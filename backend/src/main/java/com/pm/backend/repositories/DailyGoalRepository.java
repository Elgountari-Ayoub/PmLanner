package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.DailyGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {
}
