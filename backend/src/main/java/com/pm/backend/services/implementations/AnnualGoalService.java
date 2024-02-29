package com.pm.backend.services.implementations;

import com.pm.backend.dtos.AnnualGoalDTO;
import com.pm.backend.entities.AnnualGoal;
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
    private  ModelMapper modelMapper;

    public AnnualGoalService(AnnualGoalRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }
    @Override
    public Optional<AnnualGoalDTO> get(long id) {
        return Optional.empty();
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
    public void update(AnnualGoalDTO annualGoalDTO, String[] params) {

    }

    @Override
    public void delete(AnnualGoalDTO annualGoalDTO) {

    }
}
