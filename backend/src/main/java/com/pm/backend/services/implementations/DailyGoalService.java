package com.pm.backend.services.implementations;

import com.pm.backend.dtos.DailyGoalDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.repositories.DailyGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import com.pm.backend.services.interfaces.DailyGoalDao;

import java.util.List;
import java.util.Optional;

public class DailyGoalService implements DailyGoalDao {
    private DailyGoalRepository repository;

    public DailyGoalService(DailyGoalRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<DailyGoalDTO> get(long id) {
        return Optional.empty();
    }

    @Override
    public List<DailyGoalDTO> getAll() {
        return null;
    }

    @Override
    public void save(DailyGoalDTO dailyGoalDTO) {

    }

    @Override
    public void update(DailyGoalDTO dailyGoalDTO, String[] params) {

    }

    @Override
    public void delete(DailyGoalDTO dailyGoalDTO) {

    }
}
