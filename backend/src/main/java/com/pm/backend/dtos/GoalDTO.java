package com.pm.backend.dtos;

import com.pm.backend.enums.Priority;
import com.pm.backend.enums.Status;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class GoalDTO {
    private String title;
    private String details;
    private final LocalDate deadline = LocalDate.now();
    private Priority priority;
    private Status status;
    private int progress;
}
