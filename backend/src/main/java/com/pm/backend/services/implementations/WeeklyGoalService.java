package com.pm.backend.services.implementations;

import com.pm.backend.dtos.weeklyGoalDtos.WeeklyGoal_Monthly_Daily_GoalsDTO;
import com.pm.backend.entities.MonthlyGoal;
import com.pm.backend.entities.WeeklyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.MonthlyGoalRepository;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.WeeklyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeeklyGoalService implements WeeklyGoalDao {
    private WeeklyGoalRepository repository;
    private MonthlyGoalRepository monthlyGoalRepository;
    private ModelMapper modelMapper;

    public WeeklyGoalService(WeeklyGoalRepository repository, MonthlyGoalRepository monthlyGoalRepository, ModelMapper modelMapper) {
        this.repository = repository;
        this.monthlyGoalRepository = monthlyGoalRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public WeeklyGoal_Monthly_Daily_GoalsDTO get(long id) {
        WeeklyGoal existingGoal = this.findWeeklyGoalElseThrowException(id);

        WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO = modelMapper.map(existingGoal, WeeklyGoal_Monthly_Daily_GoalsDTO.class);
        return weeklyGoalDTO;
    }

    @Override
    public List<WeeklyGoal_Monthly_Daily_GoalsDTO> getAll() {
        List<WeeklyGoal> weeklyGoals = repository.findAll();
        List<WeeklyGoal_Monthly_Daily_GoalsDTO> weeklyGoalDTOS = weeklyGoals.stream()
                .map(weeklyGoal -> modelMapper.map(weeklyGoal, WeeklyGoal_Monthly_Daily_GoalsDTO.class))
                .collect(Collectors.toList());
        return weeklyGoalDTOS;
    }

    @Override
    public void save(WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO) {
        MonthlyGoal monthlyGoal = findMonthlyGoalElseThrowException(weeklyGoalDTO.getMonthlyGoal().getId());
        WeeklyGoal weeklyGoal = modelMapper.map(weeklyGoalDTO, WeeklyGoal.class);
        weeklyGoal.setMonthlyGoal(monthlyGoal);
        repository.save(weeklyGoal);
    }

    @Override
    public void save(WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO, long id) {
        MonthlyGoal monthlyGoal = findMonthlyGoalElseThrowException(id);
        WeeklyGoal weeklyGoal = modelMapper.map(weeklyGoalDTO, WeeklyGoal.class);
        weeklyGoal.setMonthlyGoal(monthlyGoal);
        repository.save(weeklyGoal);
    }

    @Override
    public void update(long id, WeeklyGoal_Monthly_Daily_GoalsDTO weeklyGoalDTO) {
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

    private MonthlyGoal findMonthlyGoalElseThrowException(long id) {
        return monthlyGoalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Monthly Goal not found"));
    }


}