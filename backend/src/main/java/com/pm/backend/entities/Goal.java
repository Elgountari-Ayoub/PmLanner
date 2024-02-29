package com.pm.backend.entities;

import com.pm.backend.enums.Priority;
import com.pm.backend.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@MappedSuperclass
public class Goal {
    private String title;
    private String details;
    private final LocalDate deadline = LocalDate.now();
    private Priority priority;
    private Status status;
    private int progress;

}
