package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnualGoalRepository extends JpaRepository<AnnualGoal, Long> {
}
