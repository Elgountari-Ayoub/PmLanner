package com.pm.backend.controllers;

import com.pm.backend.dtos.AnnualGoalDTO;
import com.pm.backend.services.implementations.AnnualGoalService;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/annualGoals")
@CrossOrigin("*")
@RestController
public class AnnualGoalController {
    @Autowired
    private AnnualGoalDao annualGoalService;

    @PostMapping()
    public void save(@RequestBody AnnualGoalDTO annualGoalDTO) {
        annualGoalService.save(annualGoalDTO);
    }

    @GetMapping()
    public ResponseEntity<List<AnnualGoalDTO>> getAll() {

        List<AnnualGoalDTO> annualGoalDTOList = annualGoalService.getAll();
        return ResponseEntity.ok(annualGoalDTOList);
    }
}
