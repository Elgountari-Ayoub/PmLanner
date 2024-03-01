package com.pm.backend.controllers;

import com.pm.backend.dtos.AnnualGoalDTO;
import com.pm.backend.services.implementations.AnnualGoalService;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/v1/annual-goals")
@CrossOrigin("*")
@RestController
public class AnnualGoalController {
    @Autowired
    private AnnualGoalDao annualGoalService;

    @GetMapping()
    public ResponseEntity<List<AnnualGoalDTO>> getAll() {
        List<AnnualGoalDTO> annualGoalDTOList = annualGoalService.getAll();
        return ResponseEntity.ok(annualGoalDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnualGoalDTO> getById(@PathVariable long id) {
        AnnualGoalDTO annualGoalDTO = annualGoalService.get(id);
        return ResponseEntity.ok(annualGoalDTO);
    }

    @PostMapping()
    public void save(@RequestBody AnnualGoalDTO annualGoalDTO) {
        annualGoalService.save(annualGoalDTO);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable long id,@RequestBody AnnualGoalDTO annualGoalDTO) {
        annualGoalService.update(id, annualGoalDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        annualGoalService.delete(id);
    }

}
