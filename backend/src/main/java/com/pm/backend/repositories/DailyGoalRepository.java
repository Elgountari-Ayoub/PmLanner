package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.DailyGoal;
import com.pm.backend.entities.MonthlyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {
    List<DailyGoal> findAllByOrderByCreatedAt();

    List<DailyGoal> findAllByWeeklyGoalIdOrderByCreatedAt(long id);


}
