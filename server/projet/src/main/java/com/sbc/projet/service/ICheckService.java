package com.sbc.projet.service;

import com.sbc.projet.model.Identity;

public interface ICheckService {
    public String checkTokenForUser(String deviceId);
    public void saveToken(Identity identity);
}
