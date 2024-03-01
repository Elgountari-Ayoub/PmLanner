package com.pm.backend.controllers;

import com.pm.backend.dtos.WeeklyGoalDTO;
import com.pm.backend.services.interfaces.WeeklyGoalDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weekly-goals")
public class WeeklyGoalController {
    private final WeeklyGoalDao weeklyGoalService;

    public WeeklyGoalController(WeeklyGoalDao weeklyGoalService) {
        this.weeklyGoalService = weeklyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeeklyGoalDTO> getWeeklyGoal(@PathVariable long id) {
        WeeklyGoalDTO goalDTO = weeklyGoalService.get(id);
        return ResponseEntity.ok(goalDTO);
    }

    @GetMapping
    public ResponseEntity<List<WeeklyGoalDTO>> getAllWeeklyGoals() {
        List<WeeklyGoalDTO> goalDTOs = weeklyGoalService.getAll();
        return ResponseEntity.ok(goalDTOs);
    }

    @PostMapping
    public ResponseEntity<Void> createWeeklyGoal(@RequestBody WeeklyGoalDTO weeklyGoalDTO) {
        weeklyGoalService.save(weeklyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateWeeklyGoal(@PathVariable long id, @RequestBody WeeklyGoalDTO weeklyGoalDTO) {
        weeklyGoalService.update(id, weeklyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeeklyGoal(@PathVariable long id) {
        weeklyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}
