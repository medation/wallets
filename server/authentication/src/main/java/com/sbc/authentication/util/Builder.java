package com.sbc.authentication.util;

import com.sbc.authentication.model.Identity;
import com.sbc.authentication.model.User;

public class Builder {

    public static Identity buildIdentity(User user, String token){
        return new Identity(token, user.getDeviceId());
    }
}
