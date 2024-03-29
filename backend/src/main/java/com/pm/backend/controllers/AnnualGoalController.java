package com.pm.backend.controllers;

import com.pm.backend.dtos.annualGoalDtos.AnnualGoal_MonthlyGoalsDTO;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/annual-goals")
@CrossOrigin("*")
@RestController
public class AnnualGoalController {
    @Autowired
    private AnnualGoalDao annualGoalService;

    @GetMapping()
    public ResponseEntity<List<AnnualGoal_MonthlyGoalsDTO>> getAll() {
        List<AnnualGoal_MonthlyGoalsDTO> annualGoalMonthlyGoalsDTOS = annualGoalService.getAll();
        return ResponseEntity.ok(annualGoalMonthlyGoalsDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnualGoal_MonthlyGoalsDTO> getById(@PathVariable long id) {
        return ResponseEntity.ok(annualGoalService.get(id));
    }

    @PostMapping()
    public void save(@Valid @RequestBody AnnualGoal_MonthlyGoalsDTO annualGoalMonthlyGoalsDTO) {
        annualGoalService.save(annualGoalMonthlyGoalsDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable long id, @Valid @RequestBody AnnualGoal_MonthlyGoalsDTO annualGoalMonthlyGoalsDTO) {
        annualGoalService.update(id, annualGoalMonthlyGoalsDTO);
        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        annualGoalService.delete(id);
        return ResponseEntity.ok().build();
    }

}
