package com.pm.backend.services.implementations;

import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.repositories.DailyGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;

import java.util.List;
import java.util.Optional;

public class DailyGoalService implements AnnualGoalDao {
    private DailyGoalRepository repository;

    public DailyGoalService(DailyGoalRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<AnnualGoal> get(long id) {
        return Optional.empty();
    }

    @Override
    public List<AnnualGoal> getAll() {
        return null;
    }

    @Override
    public void save(AnnualGoal annualGoal) {

    }

    @Override
    public void update(AnnualGoal annualGoal, String[] params) {

    }

    @Override
    public void delete(AnnualGoal annualGoal) {

    }
}
