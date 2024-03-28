package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.MonthlyGoal;
import com.pm.backend.entities.WeeklyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, Long> {
    List<WeeklyGoal> findAllByOrderByCreatedAt();
    List<WeeklyGoal> findAllByMonthlyGoalIdOrderByCreatedAt( long id);

}
