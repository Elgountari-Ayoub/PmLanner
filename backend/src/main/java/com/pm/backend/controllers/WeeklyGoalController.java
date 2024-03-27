package com.pm.backend.controllers;

import com.pm.backend.dtos.weeklyGoalDtos.WeeklyGoal_Monthly_Daily_GoalsDTO;
import com.pm.backend.services.interfaces.WeeklyGoalDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/weekly-goals")
@CrossOrigin("*")

public class WeeklyGoalController {
    private final WeeklyGoalDao weeklyGoalService;

    public WeeklyGoalController(WeeklyGoalDao weeklyGoalService) {
        this.weeklyGoalService = weeklyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeeklyGoal_Monthly_Daily_GoalsDTO> getWeeklyGoal(@PathVariable long id) {
        return ResponseEntity.ok(weeklyGoalService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<WeeklyGoal_Monthly_Daily_GoalsDTO>> getAllWeeklyGoals() {
        return ResponseEntity.ok(weeklyGoalService.getAll());
    }

    @PostMapping
    public ResponseEntity<Void> createWeeklyGoal(@RequestBody WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO) {
        weeklyGoalService.save(weeklyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateWeeklyGoal(@PathVariable long id, @RequestBody WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO) {
        weeklyGoalService.update(id, weeklyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeeklyGoal(@PathVariable long id) {
        weeklyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}
