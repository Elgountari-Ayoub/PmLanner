package com.pm.backend.controllers;

import com.pm.backend.dtos.DailyGoalDTO;
import com.pm.backend.services.interfaces.DailyGoalDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daily-goals")
public class DailyGoalController {
    private final DailyGoalDao dailyGoalService;

    public DailyGoalController(DailyGoalDao dailyGoalService) {
        this.dailyGoalService = dailyGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyGoalDTO> getDailyGoal(@PathVariable long id) {
        DailyGoalDTO goalDTO = dailyGoalService.get(id);
        return ResponseEntity.ok(goalDTO);
    }

    @GetMapping
    public ResponseEntity<List<DailyGoalDTO>> getAllDailyGoals() {
        List<DailyGoalDTO> goalDTOs = dailyGoalService.getAll();
        return ResponseEntity.ok(goalDTOs);
    }

    @PostMapping
    public ResponseEntity<Void> createDailyGoal(@RequestBody DailyGoalDTO dailyGoalDTO) {
        dailyGoalService.save(dailyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDailyGoal(@PathVariable long id, @RequestBody DailyGoalDTO dailyGoalDTO) {
        dailyGoalService.update(id, dailyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyGoal(@PathVariable long id) {
        dailyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}