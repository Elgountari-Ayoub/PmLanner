package com.pm.backend.repositories;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnnualGoalRepository extends JpaRepository<AnnualGoal, Long> {
    List<AnnualGoal> findAllByUser_IdOrderByPriorityAscCreatedAt(long userId);
    Optional<AnnualGoal> findByIdAndUser_Id(long id, long userId);

}
