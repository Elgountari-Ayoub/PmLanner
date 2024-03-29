package com.pm.backend.controllers;

import com.pm.backend.dtos.monthlyGoalDtos.MonthlyGoalDTO;
import com.pm.backend.dtos.monthlyGoalDtos.MonthlyGoal_Annual_Weekly_GoalsDTO;
import com.pm.backend.services.interfaces.MonthlyGoalDao;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/monthly-goals")
@CrossOrigin("*")
@RestController
public class MonthlyGoalController {
    private final MonthlyGoalDao monthlyGoalService;

    public MonthlyGoalController(MonthlyGoalDao monthlyGoalService) {
        this.monthlyGoalService = monthlyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonthlyGoal_Annual_Weekly_GoalsDTO> getMonthlyGoal(@PathVariable long id) {
        return ResponseEntity.ok(monthlyGoalService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<MonthlyGoal_Annual_Weekly_GoalsDTO>> getAllMonthlyGoals() {
        return ResponseEntity.ok(monthlyGoalService.getAll());
    }
    @GetMapping("/annualGoal/{id}")
    public ResponseEntity<List<MonthlyGoal_Annual_Weekly_GoalsDTO>> getAllMonthlyGoalsByAnnualGoalId(@PathVariable long id) {
        return ResponseEntity.ok(monthlyGoalService.getAllByAnnualGoalId(id));
    }

    @PostMapping
    public ResponseEntity<Void> createMonthlyGoal(@Valid @RequestBody MonthlyGoal_Annual_Weekly_GoalsDTO monthlyGoalDTO) {
        monthlyGoalService.save(monthlyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMonthlyGoal(@PathVariable long id, @Valid @RequestBody MonthlyGoal_Annual_Weekly_GoalsDTO monthlyGoalDTO) {
        monthlyGoalService.update(id, monthlyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonthlyGoal(@PathVariable long id) {
        monthlyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}
