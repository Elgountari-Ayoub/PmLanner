package com.pm.backend.services.implementations;

import com.pm.backend.dtos.DailyGoalDTO;
import com.pm.backend.entities.DailyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.DailyGoalRepository;
import com.pm.backend.services.interfaces.DailyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyGoalService implements DailyGoalDao {
    private DailyGoalRepository repository;
    private ModelMapper modelMapper;

    public DailyGoalService(DailyGoalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DailyGoalDTO get(long id) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);

        DailyGoalDTO dailyGoalDTO = modelMapper.map(existingGoal, DailyGoalDTO.class);
        return dailyGoalDTO;
    }

    @Override
    public List<DailyGoalDTO> getAll() {
        List<DailyGoal> dailyGoals = repository.findAll();
        List<DailyGoalDTO> dailyGoalDTOS = dailyGoals.stream()
                .map(dailyGoal -> modelMapper.map(dailyGoal, DailyGoalDTO.class))
                .collect(Collectors.toList());
        return dailyGoalDTOS;
    }

    @Override
    public void save(DailyGoalDTO dailyGoalDTO) {
        DailyGoal dailyGoal = modelMapper.map(dailyGoalDTO, DailyGoal.class);
        repository.save(dailyGoal);
    }

    @Override
    public void update(long id, DailyGoalDTO dailyGoalDTO) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);

        existingGoal.setTitle(dailyGoalDTO.getTitle());
        existingGoal.setDescription(dailyGoalDTO.getDescription());
        existingGoal.setDeadline(dailyGoalDTO.getDeadline());
        existingGoal.setPriority(dailyGoalDTO.getPriority());
        existingGoal.setProgress(dailyGoalDTO.getProgress());

        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);

        repository.delete(existingGoal);
    }

    private DailyGoal findDailyGoalElseThrowException(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Daily Goal not found"));
    }
}