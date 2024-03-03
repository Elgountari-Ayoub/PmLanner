package com.pm.backend.dtos.monthlyGoalDtos;

import com.pm.backend.dtos.GoalDTO;
import com.pm.backend.dtos.annualGoalDtos.AnnualGoalDTO;
import com.pm.backend.dtos.weeklyGoalDtos.WeeklyGoalDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyGoal_Annual_Weekly_GoalsDTO extends GoalDTO {
    private AnnualGoalDTO annualGoal;
    private List<WeeklyGoalDTO> weeklyGoals;
}
