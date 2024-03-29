package com.pm.backend.repositories;

import com.pm.backend.entities.DailyGoal;
import com.pm.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {
    List<DailyGoal> findAllByUser_IdOrderByCreatedAt(long userId);
    Optional<DailyGoal> findByIdAndUser_Id(long id, long userId);
    List<DailyGoal> findAllByDeadlineAndUser_Id(LocalDate deadLine, long userId);

    List<DailyGoal> findAllByWeeklyGoalIdOrderByCreatedAt(long id);


}
