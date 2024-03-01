package com.pm.backend.services.implementations;

import com.pm.backend.dtos.MonthlyGoalDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.repositories.MonthlyGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import com.pm.backend.services.interfaces.MonthlyGoalDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonthlyGoalService implements MonthlyGoalDao {
    private MonthlyGoalRepository repository;

    public MonthlyGoalService(MonthlyGoalRepository repository) {
        this.repository = repository;
    }

    @Override
    public MonthlyGoalDTO get(long id) {
        return null;
    }

    @Override
    public List<MonthlyGoalDTO> getAll() {
        return null;
    }

    @Override
    public void save(MonthlyGoalDTO monthlyGoalDTO) {

    }

    @Override
    public void update(MonthlyGoalDTO monthlyGoalDTO, String[] params) {

    }

    @Override
    public void delete(MonthlyGoalDTO monthlyGoalDTO) {

    }
}
