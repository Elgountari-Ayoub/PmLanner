package com.pm.backend.services.implementations;

import com.pm.backend.dtos.monthlyGoalDtos.MonthlyGoal_Annual_Weekly_GoalsDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.entities.MonthlyGoal;
import com.pm.backend.entities.User;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.AnnualGoalRepository;
import com.pm.backend.repositories.MonthlyGoalRepository;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.AuthenticationService;
import com.pm.backend.services.interfaces.MonthlyGoalDao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonthlyGoalService implements MonthlyGoalDao {
    private final MonthlyGoalRepository repository;
    private final AnnualGoalRepository annualGoalRepository;
    private final WeeklyGoalRepository weeklyGoalRepository;
    private final ModelMapper modelMapper;
    private AuthenticationService authenticationService;
    private final User authUser;

    public MonthlyGoalService(
            MonthlyGoalRepository repository, AnnualGoalRepository annualGoalRepository,
            WeeklyGoalRepository weeklyGoalRepository, AuthenticationService authenticationService,
            ModelMapper modelMapper) {
        this.repository = repository;
        this.annualGoalRepository = annualGoalRepository;
        this.weeklyGoalRepository = weeklyGoalRepository;
        this.modelMapper = modelMapper;
        this.authenticationService = authenticationService;
        this.authUser = authenticationService.getAuthUser();

    }

    @Override
    public MonthlyGoal_Annual_Weekly_GoalsDTO get(long id) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);
        System.out.println(existingGoal.getWeeklyGoals().size());
        existingGoal.setWeeklyGoals(weeklyGoalRepository.findAllByMonthlyGoalIdOrderByCreatedAt(existingGoal.getId()));
        return modelMapper.map(existingGoal, MonthlyGoal_Annual_Weekly_GoalsDTO.class);
    }

    @Override
    public List<MonthlyGoal_Annual_Weekly_GoalsDTO> getAll() {
        List<MonthlyGoal> monthlyGoals = repository.findAllByUser_IdOrderByCreatedAt(this.authUser.getId());
        return monthlyGoals.stream()
                .map(monthlyGoal -> modelMapper.map(monthlyGoal, MonthlyGoal_Annual_Weekly_GoalsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<MonthlyGoal_Annual_Weekly_GoalsDTO> getAllByAnnualGoalId(long id) {
        List<MonthlyGoal> monthlyGoals = repository.findAllByAnnualGoalIdAndUser_IdOrderByCreatedAt(id, this.authUser.getId());
        return monthlyGoals.stream()
                .map(monthlyGoal -> modelMapper.map(monthlyGoal, MonthlyGoal_Annual_Weekly_GoalsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void save(MonthlyGoal_Annual_Weekly_GoalsDTO monthlyGoalDTO) {
        AnnualGoal annualGoal = this.findAnnualGoalElseThrowException(monthlyGoalDTO.getAnnualGoal().getId());
        MonthlyGoal monthlyGoal = modelMapper.map(monthlyGoalDTO, MonthlyGoal.class);
        monthlyGoal.setAnnualGoal(annualGoal);
        monthlyGoal.setUser(this.authUser);
        repository.save(monthlyGoal);
    }

    @Override
    public void save(MonthlyGoal_Annual_Weekly_GoalsDTO monthlyGoalDTO, long id) {
        AnnualGoal annualGoal = this.findAnnualGoalElseThrowException(id);
        MonthlyGoal monthlyGoal = modelMapper.map(monthlyGoalDTO, MonthlyGoal.class);
        monthlyGoal.setAnnualGoal(annualGoal);
        monthlyGoal.setUser(this.authUser);

        repository.save(monthlyGoal);
    }

    @Override
    public void update(long id, MonthlyGoal_Annual_Weekly_GoalsDTO monthlyGoalDTO) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);

        existingGoal.setTitle(monthlyGoalDTO.getTitle());
        existingGoal.setDescription(monthlyGoalDTO.getDescription());
        existingGoal.setDeadline(monthlyGoalDTO.getDeadline());
        existingGoal.setPriority(monthlyGoalDTO.getPriority());
        existingGoal.setProgress(monthlyGoalDTO.getProgress());
        existingGoal.setStatus(monthlyGoalDTO.getStatus());
        existingGoal.setUser(this.authUser);

        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {
        MonthlyGoal existingGoal = this.findMonthlyGoalElseThrowException(id);
        repository.delete(existingGoal);
    }

    private MonthlyGoal findMonthlyGoalElseThrowException(long id) {
        return repository.findByIdAndUser_Id(id, this.authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Monthly Goal not found"));
    }

    private AnnualGoal findAnnualGoalElseThrowException(long id) {
        return annualGoalRepository.findByIdAndUser_Id(id, authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Annual Goal not found"));
    }
}