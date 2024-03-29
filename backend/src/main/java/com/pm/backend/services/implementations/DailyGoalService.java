package com.pm.backend.services.implementations;

import com.pm.backend.dtos.dailyGoalDtos.DailyGoal_WeeklyGoalDTO;
import com.pm.backend.entities.DailyGoal;
import com.pm.backend.entities.WeeklyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.DailyGoalRepository;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.DailyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DailyGoalService implements DailyGoalDao {
    private DailyGoalRepository repository;
    private WeeklyGoalRepository weeklyGoalRepository;
    private ModelMapper modelMapper;

    public DailyGoalService(DailyGoalRepository repository, WeeklyGoalRepository weeklyGoalRepository, ModelMapper modelMapper) {
        this.repository = repository;
        this.weeklyGoalRepository = weeklyGoalRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DailyGoal_WeeklyGoalDTO get(long id) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);
        return modelMapper.map(existingGoal, DailyGoal_WeeklyGoalDTO.class);
    }

    @Override
    public List<DailyGoal_WeeklyGoalDTO> getAll() {
        List<DailyGoal> dailyGoals = repository.findAllByOrderByCreatedAt();
        return dailyGoals.stream()
                .map(dailyGoal -> modelMapper.map(dailyGoal, DailyGoal_WeeklyGoalDTO.class))
                .collect(Collectors.toList());
    }

    public List<DailyGoal_WeeklyGoalDTO> getByDeadLine(LocalDate deadline) {
        List<DailyGoal> dailyGoals = repository.findAllByDeadline(deadline);
        return dailyGoals.stream()
                .map(dailyGoal -> modelMapper.map(dailyGoal, DailyGoal_WeeklyGoalDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void save(DailyGoal_WeeklyGoalDTO dailyGoalWeeklyGoalDTO) {
        WeeklyGoal weeklyGoal = findWeeklyGoalElseThrowException(dailyGoalWeeklyGoalDTO.getWeeklyGoal().getId());
        DailyGoal dailyGoal = modelMapper.map(dailyGoalWeeklyGoalDTO, DailyGoal.class);
        dailyGoal.setWeeklyGoal(weeklyGoal);
        repository.save(dailyGoal);
    }

    @Override
    public void save(DailyGoal_WeeklyGoalDTO dailyGoalWeeklyGoalDTO, long id) {
        WeeklyGoal weeklyGoal = findWeeklyGoalElseThrowException(id);
        DailyGoal dailyGoal = modelMapper.map(dailyGoalWeeklyGoalDTO, DailyGoal.class);
        dailyGoal.setWeeklyGoal(weeklyGoal);
        repository.save(dailyGoal);

    }

    @Override
    public void update(long id, DailyGoal_WeeklyGoalDTO dailyGoalWeeklyGoalDTO) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);

        existingGoal.setTitle(dailyGoalWeeklyGoalDTO.getTitle());
        existingGoal.setDescription(dailyGoalWeeklyGoalDTO.getDescription());
        existingGoal.setDeadline(dailyGoalWeeklyGoalDTO.getDeadline());
        existingGoal.setPriority(dailyGoalWeeklyGoalDTO.getPriority());
        existingGoal.setProgress(dailyGoalWeeklyGoalDTO.getProgress());
        existingGoal.setStatus(dailyGoalWeeklyGoalDTO.getStatus());

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

    private WeeklyGoal findWeeklyGoalElseThrowException(long id) {
        return weeklyGoalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly Goal not found"));
    }
}