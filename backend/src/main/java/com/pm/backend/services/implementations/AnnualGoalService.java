package com.pm.backend.services.implementations;

import com.pm.backend.dtos.AnnualGoalDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.repositories.AnnualGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@Service
public class AnnualGoalService implements AnnualGoalDao {
    private  AnnualGoalRepository repository;

    public AnnualGoalService(AnnualGoalRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<AnnualGoalDTO> get(long id) {
        return Optional.empty();
    }

    @Override
    public List<AnnualGoalDTO> getAll() {
        return null;
    }

    @Override
    public void save(AnnualGoalDTO annualGoalDTO) {

    }

    @Override
    public void update(AnnualGoalDTO annualGoalDTO, String[] params) {

    }

    @Override
    public void delete(AnnualGoalDTO annualGoalDTO) {

    }
}
