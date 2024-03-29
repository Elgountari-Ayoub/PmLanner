package com.pm.backend.repositories;

import com.pm.backend.entities.MonthlyGoal;
import com.pm.backend.entities.User;
import com.pm.backend.entities.WeeklyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonthlyGoalRepository extends JpaRepository<MonthlyGoal, Long> {
    List<MonthlyGoal> findAllByUser_IdOrderByCreatedAt(long userId);
    List<MonthlyGoal> findAllByAnnualGoalIdAndUser_IdOrderByCreatedAt(long id, long userId);;
    Optional<MonthlyGoal> findByIdAndUser_Id(long id, long userId);


}
