package com.sbc.projet.service.implement;

import com.sbc.projet.model.Identity;
import com.sbc.projet.repository.IdentityRepository;
import com.sbc.projet.service.ICheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckService implements ICheckService {

    @Autowired
    public IdentityRepository identityRepository;

    @Override
    public String checkTokenForUser(String deviceId) {
        Identity identity = identityRepository.findByDeviceId("1");
        if(identity != null){
            identityRepository.delete(identity);
            return identity.getToken();
        }
        return null;
    }

    @Override
    public void saveToken(Identity identity) {
        Identity identityExist = identityRepository.findByDeviceId(identity.getDeviceId());
        if(identityExist != null){
            identityExist.setToken(identity.getToken());
            identityRepository.save(identityExist);
        } else {
            identityRepository.save(identity);
        }
    }
}
