package com.pm.backend.controllers;

import com.pm.backend.dtos.MonthlyGoalDTO;
import com.pm.backend.services.interfaces.MonthlyGoalDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monthly-goals")
public class MonthlyGoalController {
    private final MonthlyGoalDao monthlyGoalService;

    public MonthlyGoalController(MonthlyGoalDao monthlyGoalService) {
        this.monthlyGoalService = monthlyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonthlyGoalDTO> getMonthlyGoal(@PathVariable long id) {
        MonthlyGoalDTO goalDTO = monthlyGoalService.get(id);
        return ResponseEntity.ok(goalDTO);
    }

    @GetMapping
    public ResponseEntity<List<MonthlyGoalDTO>> getAllMonthlyGoals() {
        List<MonthlyGoalDTO> goalDTOs = monthlyGoalService.getAll();
        return ResponseEntity.ok(goalDTOs);
    }

    @PostMapping
    public ResponseEntity<Void> createMonthlyGoal(@RequestBody MonthlyGoalDTO monthlyGoalDTO) {
        monthlyGoalService.save(monthlyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMonthlyGoal(@PathVariable long id, @RequestBody MonthlyGoalDTO monthlyGoalDTO) {
        monthlyGoalService.update(id, monthlyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonthlyGoal(@PathVariable long id) {
        monthlyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}
