package com.pm.backend.dtos;

import jakarta.persistence.MappedSuperclass;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnnualGoalDTO extends GoalDTO{
}
