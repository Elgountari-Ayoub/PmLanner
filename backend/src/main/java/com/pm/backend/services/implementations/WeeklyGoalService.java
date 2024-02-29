package com.pm.backend.services.implementations;

import com.pm.backend.dtos.WeeklyGoalDTO;
import com.pm.backend.entities.AnnualGoal;
import com.pm.backend.repositories.WeeklyGoalRepository;
import com.pm.backend.services.interfaces.AnnualGoalDao;
import com.pm.backend.services.interfaces.WeeklyGoalDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeeklyGoalService implements WeeklyGoalDao {
    private WeeklyGoalRepository repository;

    public WeeklyGoalService(WeeklyGoalRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<WeeklyGoalDTO> get(long id) {
        return Optional.empty();
    }

    @Override
    public List<WeeklyGoalDTO> getAll() {
        return null;
    }

    @Override
    public void save(WeeklyGoalDTO weeklyGoalDTO) {

    }

    @Override
    public void update(WeeklyGoalDTO weeklyGoalDTO, String[] params) {

    }

    @Override
    public void delete(WeeklyGoalDTO weeklyGoalDTO) {

    }
}
