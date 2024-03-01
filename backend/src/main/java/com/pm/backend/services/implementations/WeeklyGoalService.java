package com.pm.backend.services.implementations;

import com.pm.backend.dtos.WeeklyGoalDTO;
import com.pm.backend.entities.WeeklyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.WeeklyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WeeklyGoalService implements WeeklyGoalDao {
    private WeeklyGoalRepository repository;
    private ModelMapper modelMapper;

    public WeeklyGoalService(WeeklyGoalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public WeeklyGoalDTO get(long id) {
        WeeklyGoal existingGoal = this.findWeeklyGoalElseThrowException(id);

        WeeklyGoalDTO weeklyGoalDTO = modelMapper.map(existingGoal, WeeklyGoalDTO.class);
        return weeklyGoalDTO;
    }

    @Override
    public List<WeeklyGoalDTO> getAll() {
        List<WeeklyGoal> weeklyGoals = repository.findAll();
        List<WeeklyGoalDTO> weeklyGoalDTOS = weeklyGoals.stream()
                .map(weeklyGoal -> modelMapper.map(weeklyGoal, WeeklyGoalDTO.class))
                .collect(Collectors.toList());
        return weeklyGoalDTOS;
    }

    @Override
    public void save(WeeklyGoalDTO weeklyGoalDTO) {
        WeeklyGoal weeklyGoal = modelMapper.map(weeklyGoalDTO, WeeklyGoal.class);
        repository.save(weeklyGoal);
    }

    @Override
    public void update(long id, WeeklyGoalDTO weeklyGoalDTO) {
        WeeklyGoal existingGoal = this.findWeeklyGoalElseThrowException(id);

        existingGoal.setTitle(weeklyGoalDTO.getTitle());
        existingGoal.setDescription(weeklyGoalDTO.getDescription());
        existingGoal.setDeadline(weeklyGoalDTO.getDeadline());
        existingGoal.setPriority(weeklyGoalDTO.getPriority());
        existingGoal.setProgress(weeklyGoalDTO.getProgress());

        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {
        WeeklyGoal existingGoal = this.findWeeklyGoalElseThrowException(id);

        repository.delete(existingGoal);
    }

    private WeeklyGoal findWeeklyGoalElseThrowException(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly Goal not found"));
    }
}