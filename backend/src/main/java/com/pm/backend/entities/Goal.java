package com.pm.backend.entities;

import com.pm.backend.enums.Priority;
import com.pm.backend.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class Goal {
    private String title;
    private String description;
    private LocalDate deadline;
    private LocalDateTime createdAt;
    private Priority priority;
    private Status status;
    private int progress;

}
