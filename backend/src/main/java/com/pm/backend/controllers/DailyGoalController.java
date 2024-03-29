package com.pm.backend.controllers;

import com.pm.backend.dtos.dailyGoalDtos.DailyGoalDTO;
import com.pm.backend.dtos.dailyGoalDtos.DailyGoal_WeeklyGoalDTO;
import com.pm.backend.services.implementations.DailyGoalService;
import com.pm.backend.services.interfaces.DailyGoalDao;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/daily-goals")
@CrossOrigin("*")
public class DailyGoalController {

    @Autowired
    private DailyGoalService dailyGoalService;

    @GetMapping("/{id}")
    public ResponseEntity<DailyGoal_WeeklyGoalDTO> getDailyGoal(@PathVariable long id) {
        return ResponseEntity.ok(dailyGoalService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<DailyGoal_WeeklyGoalDTO>> getAllDailyGoals() {
        return ResponseEntity.ok(dailyGoalService.getAll());
    }

    @GetMapping("/today")
    public ResponseEntity<List<DailyGoal_WeeklyGoalDTO>> getTodayGoals() {
        return ResponseEntity.ok(dailyGoalService.getByDeadLine(LocalDate.now()));
    }

    @PostMapping
    public ResponseEntity<Void> createDailyGoal(@Valid @RequestBody DailyGoal_WeeklyGoalDTO dailyGoalDTO) {
        dailyGoalService.save(dailyGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDailyGoal(@PathVariable long id, @Valid @RequestBody DailyGoal_WeeklyGoalDTO dailyGoalDTO) {
        dailyGoalService.update(id, dailyGoalDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyGoal(@PathVariable long id) {
        dailyGoalService.delete(id);
        return ResponseEntity.ok().build();
    }
}