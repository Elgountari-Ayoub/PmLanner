package com.pm.backend.repositories;

import com.pm.backend.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, Long> {
    List<WeeklyGoal> findAllByUser_IdOrderByCreatedAt(long id);
    Optional<WeeklyGoal> findByIdAndUser_Id(long id, long userId);

    List<WeeklyGoal> findAllByMonthlyGoalIdOrderByCreatedAt( long id);

}
