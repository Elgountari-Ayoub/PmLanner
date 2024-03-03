package com.pm.backend.dtos.annualGoalDtos;

import com.pm.backend.dtos.GoalDTO;
import com.pm.backend.dtos.monthlyGoalDtos.MonthlyGoalDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnualGoal_MonthlyGoalsDTO extends GoalDTO implements Serializable {
    private List<MonthlyGoalDTO> monthlyGoals;
}
