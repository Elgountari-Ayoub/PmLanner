package com.pm.backend.controllers;

import com.pm.backend.dtos.dailyGoalDtos.DailyGoalDTO;
import com.pm.backend.dtos.dailyGoalDtos.DailyGoal_WeeklyGoalDTO;
import com.pm.backend.services.interfaces.DailyGoalDao;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/daily-goals")
@CrossOrigin("*")
public class DailyGoalController {
    private final DailyGoalDao dailyGoalService;

    public DailyGoalController(DailyGoalDao dailyGoalService) {
        this.dailyGoalService = dailyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyGoal_WeeklyGoalDTO> getDailyGoal(@PathVariable long id) {
        return ResponseEntity.ok(dailyGoalService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<DailyGoal_WeeklyGoalDTO>> getAllDailyGoals() {
        return ResponseEntity.ok(dailyGoalService.getAll());
    }

    @PostMapping
    public ResponseEntity<Void> createDailyGoal(@Valid  @RequestBody DailyGoal_WeeklyGoalDTO dailyGoalDTO) {
        dailyGoalService.save(dailyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDailyGoal(@Valid @PathVariable long id, @RequestBody DailyGoal_WeeklyGoalDTO dailyGoalDTO) {
        dailyGoalService.update(id, dailyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyGoal(@PathVariable long id) {
        dailyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}