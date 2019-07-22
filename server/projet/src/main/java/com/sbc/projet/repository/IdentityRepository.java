package com.sbc.projet.repository;

import com.sbc.projet.model.Identity;
import org.springframework.data.repository.CrudRepository;

public interface IdentityRepository extends CrudRepository<Identity, Integer> {
    Identity findByDeviceId(String deviceId);
}
