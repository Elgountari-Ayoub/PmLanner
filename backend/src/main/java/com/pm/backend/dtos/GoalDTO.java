package com.pm.backend.dtos;

import com.pm.backend.enums.Priority;
import com.pm.backend.enums.Status;
import jakarta.persistence.MappedSuperclass;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
//@Builder
@MappedSuperclass
public class GoalDTO {
    private String title;
    private String details;
    private LocalDate deadline;
    private Priority priority;
    private Status status;
    private int progress;
}
