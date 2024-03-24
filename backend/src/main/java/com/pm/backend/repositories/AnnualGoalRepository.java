package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnualGoalRepository extends JpaRepository<AnnualGoal, Long> {
}
