package com.pm.backend.services.implementations;

import com.pm.backend.dtos.dailyGoalDtos.DailyGoal_WeeklyGoalDTO;
import com.pm.backend.entities.DailyGoal;
import com.pm.backend.entities.User;
import com.pm.backend.entities.WeeklyGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.DailyGoalRepository;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.AuthenticationService;
import com.pm.backend.services.interfaces.DailyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DailyGoalService implements DailyGoalDao {
    private DailyGoalRepository repository;
    private WeeklyGoalRepository weeklyGoalRepository;
    private ModelMapper modelMapper;

    private final AuthenticationService authenticationService;
    private User authUser;

    public DailyGoalService(DailyGoalRepository repository, WeeklyGoalRepository weeklyGoalRepository, ModelMapper modelMapper, AuthenticationService authenticationService) {
        this.repository = repository;
        this.weeklyGoalRepository = weeklyGoalRepository;
        this.modelMapper = modelMapper;
        this.authenticationService = authenticationService;
    }

    @Override
    public DailyGoal_WeeklyGoalDTO get(long id) {
        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);
        return modelMapper.map(existingGoal, DailyGoal_WeeklyGoalDTO.class);
    }

    @Override
    public List<DailyGoal_WeeklyGoalDTO> getAll() {
        this.authUser = this.authenticationService.getAuthUser();
        List<DailyGoal> dailyGoals = repository.findAllByUser_IdOrderByCreatedAt(this.authUser.getId());
        return dailyGoals.stream()
                .map(dailyGoal -> modelMapper.map(dailyGoal, DailyGoal_WeeklyGoalDTO.class))
                .collect(Collectors.toList());
    }

    public List<DailyGoal_WeeklyGoalDTO> getByDeadLine(LocalDate deadline) {
        this.authUser = this.authenticationService.getAuthUser();

        List<DailyGoal> dailyGoals = repository.findAllByDeadlineAndUser_Id(deadline, authUser.getId());
        return dailyGoals.stream()
                .map(dailyGoal -> modelMapper.map(dailyGoal, DailyGoal_WeeklyGoalDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void save(DailyGoal_WeeklyGoalDTO dailyGoalWeeklyGoalDTO) {
        WeeklyGoal weeklyGoal = findWeeklyGoalElseThrowException(dailyGoalWeeklyGoalDTO.getWeeklyGoal().getId());
        DailyGoal dailyGoal = modelMapper.map(dailyGoalWeeklyGoalDTO, DailyGoal.class);
        dailyGoal.setWeeklyGoal(weeklyGoal);

        this.authUser = this.authenticationService.getAuthUser();
        dailyGoal.setUser(this.authUser);
        repository.save(dailyGoal);
    }

    @Override
    public void save(DailyGoal_WeeklyGoalDTO dailyGoalWeeklyGoalDTO, long id) {
        WeeklyGoal weeklyGoal = findWeeklyGoalElseThrowException(id);
        DailyGoal dailyGoal = modelMapper.map(dailyGoalWeeklyGoalDTO, DailyGoal.class);
        dailyGoal.setWeeklyGoal(weeklyGoal);
        this.authUser = this.authenticationService.getAuthUser();
        dailyGoal.setUser(this.authUser);
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
        this.authUser = this.authenticationService.getAuthUser();
        existingGoal.setUser(this.authUser);


        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {

        DailyGoal existingGoal = this.findDailyGoalElseThrowException(id);
        repository.delete(existingGoal);
    }

    private DailyGoal findDailyGoalElseThrowException(long id) {
        this.authUser = this.authenticationService.getAuthUser();

        return repository.findByIdAndUser_Id(id, this.authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Daily Goal not found"));
    }

    private WeeklyGoal findWeeklyGoalElseThrowException(long id) {
        this.authUser = this.authenticationService.getAuthUser();

        return weeklyGoalRepository.findByIdAndUser_Id(id, this.authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Weekly Goal not found"));
    }
}