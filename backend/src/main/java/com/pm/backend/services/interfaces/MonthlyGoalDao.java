package com.pm.backend.services.interfaces;

import com.pm.backend.dtos.monthlyGoalDtos.MonthlyGoal_Annual_Weekly_GoalsDTO;

import java.util.List;

public interface MonthlyGoalDao extends Dao<MonthlyGoal_Annual_Weekly_GoalsDTO>{
    List<MonthlyGoal_Annual_Weekly_GoalsDTO> getAllByAnnualGoalId(long id);
}
