package com.pm.backend.services.interfaces;

import java.util.List;
import java.util.Optional;

public interface Dao<T> {

    T get(long id);

    List<T> getAll();

    void save(T t);

    void update(long id, T t);

    void delete(long id);
}
