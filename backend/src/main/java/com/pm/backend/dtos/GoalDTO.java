package com.pm.backend.dtos;

import com.pm.backend.enums.Priority;
import com.pm.backend.enums.Status;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Future;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class GoalDTO implements Serializable {
    private long id;
    private String title;
    private String description;
    @Future
    private LocalDate deadline;
    private LocalDateTime createdAt = LocalDateTime.now();
    private Priority priority;
    private Status status;
    private int progress;
}
