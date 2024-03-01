package com.pm.backend.services.implementations;

import com.pm.backend.dtos.AnnualGoalDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.exceptions.ResourceNotFoundException;
import com.pm.backend.repositories.AnnualGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public AnnualGoalDTO get(long id) {
        AnnualGoal existingGoal = this.findAnnualGoalElseThrowException(id);

        AnnualGoalDTO annualGoalDTO = modelMapper.map(existingGoal, AnnualGoalDTO.class);
        return annualGoalDTO;
    }

    @Override
    public List<AnnualGoalDTO> getAll() {
        List<AnnualGoal> annualGoals = repository.findAll();
        List<AnnualGoalDTO> annualGoalDTOS = annualGoals.stream().map(annualGoal -> modelMapper.map(annualGoal, AnnualGoalDTO.class)).toList();
        return annualGoalDTOS;
    }

    @Override
    public void save(AnnualGoalDTO annualGoalDTO) {
        AnnualGoal annualGoal = modelMapper.map(annualGoalDTO, AnnualGoal.class);
        repository.save(annualGoal);
    }

    @Override
    public void update(long id, AnnualGoalDTO annualGoalDTO) {
        AnnualGoal existingGoal = this.findAnnualGoalElseThrowException(id);

        existingGoal.setTitle(annualGoalDTO.getTitle());
        existingGoal.setDescription(annualGoalDTO.getDescription());
        existingGoal.setDeadline(annualGoalDTO.getDeadline());
        existingGoal.setPriority(annualGoalDTO.getPriority());
        existingGoal.setProgress(annualGoalDTO.getProgress());

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
