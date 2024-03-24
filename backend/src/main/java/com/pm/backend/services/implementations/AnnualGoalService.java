package com.pm.backend.services.implementations;

import com.pm.backend.dtos.annualGoalDtos.AnnualGoal_MonthlyGoalsDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.AnnualGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class AnnualGoalService implements AnnualGoalDao {
    private AnnualGoalRepository repository;
    private ModelMapper modelMapper;

    public AnnualGoalService(AnnualGoalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public AnnualGoal_MonthlyGoalsDTO get(long id) {
        AnnualGoal existingGoal = this.findAnnualGoalElseThrowException(id);

        return modelMapper.map(existingGoal, AnnualGoal_MonthlyGoalsDTO.class);
    }

    @Override
    public List<AnnualGoal_MonthlyGoalsDTO> getAll() {
        List<AnnualGoal> annualGoals = repository.findAllByOrderByPriorityAscCreatedAt();
        return annualGoals.stream().map(annualGoal -> modelMapper.map(annualGoal, AnnualGoal_MonthlyGoalsDTO.class)).toList();
    }

    @Override
    public void save(AnnualGoal_MonthlyGoalsDTO annualGoalMonthlyGoalsDTO) {
        AnnualGoal annualGoal = modelMapper.map(annualGoalMonthlyGoalsDTO, AnnualGoal.class);
        repository.save(annualGoal);
    }

    @Override
    public void save(AnnualGoal_MonthlyGoalsDTO annualGoalMonthlyGoalsDTO, long id) {

    }

    @Override
    public void update(long id, AnnualGoal_MonthlyGoalsDTO annualGoalMonthlyGoalsDTO) {
        AnnualGoal existingGoal = this.findAnnualGoalElseThrowException(id);

        existingGoal.setTitle(annualGoalMonthlyGoalsDTO.getTitle());
        existingGoal.setDescription(annualGoalMonthlyGoalsDTO.getDescription());
        existingGoal.setDeadline(annualGoalMonthlyGoalsDTO.getDeadline());
        existingGoal.setPriority(annualGoalMonthlyGoalsDTO.getPriority());
        existingGoal.setProgress(annualGoalMonthlyGoalsDTO.getProgress());

        repository.save(existingGoal);
    }

    @Override
    public void delete(long id) {
        AnnualGoal existingGoal = this.findAnnualGoalElseThrowException(id);

        repository.delete(existingGoal);
    }

    private AnnualGoal findAnnualGoalElseThrowException(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annual Goal not found"));
    }

}
