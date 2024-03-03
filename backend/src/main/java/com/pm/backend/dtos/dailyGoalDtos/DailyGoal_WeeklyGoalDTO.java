package com.pm.backend.dtos.dailyGoalDtos;

import com.pm.backend.dtos.GoalDTO;
import com.pm.backend.dtos.weeklyGoalDtos.WeeklyGoalDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyGoal_WeeklyGoalDTO extends GoalDTO {
    private WeeklyGoalDTO weeklyGoal;

}
