package com.pm.backend.services.implementations;

import com.pm.backend.dtos.MonthlyGoalDTO;
import com.pm.backend.entities.MonthlyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.MonthlyGoalRepository;
import com.pm.backend.services.interfaces.MonthlyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MonthlyGoalService implements MonthlyGoalDao {
    private final MonthlyGoalRepository repository;
    private final ModelMapper modelMapper;

    public MonthlyGoalService(MonthlyGoalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public MonthlyGoalDTO get(long id) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);

        MonthlyGoalDTO monthlyGoalDTO = modelMapper.map(existingGoal, MonthlyGoalDTO.class);
        return monthlyGoalDTO;
    }

    @Override
    public List<MonthlyGoalDTO> getAll() {
        List<MonthlyGoal> monthlyGoals = repository.findAll();
        List<MonthlyGoalDTO> monthlyGoalDTOS = monthlyGoals.stream()
                .map(monthlyGoal -> modelMapper.map(monthlyGoal, MonthlyGoalDTO.class))
                .collect(Collectors.toList());
        return monthlyGoalDTOS;
    }

    @Override
    public void save(MonthlyGoalDTO monthlyGoalDTO) {
        MonthlyGoal monthlyGoal = modelMapper.map(monthlyGoalDTO, MonthlyGoal.class);
        repository.save(monthlyGoal);
    }

    @Override
    public void update(long id, MonthlyGoalDTO monthlyGoalDTO) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);

        existingGoal.setTitle(monthlyGoalDTO.getTitle());
        existingGoal.setDescription(monthlyGoalDTO.getDescription());
        existingGoal.setDeadline(monthlyGoalDTO.getDeadline());
        existingGoal.setPriority(monthlyGoalDTO.getPriority());
        existingGoal.setProgress(monthlyGoalDTO.getProgress());

        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);

        repository.delete(existingGoal);
    }

    private MonthlyGoal findMonthlyGoalElseThrowException(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Monthly Goal not found"));
    }
}