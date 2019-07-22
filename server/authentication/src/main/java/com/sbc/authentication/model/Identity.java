package com.sbc.authentication.model;

import javax.persistence.*;

@Entity
@Table(name = "identity")
public class Identity {

    @Id
    @Column(name = "identity_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "token")
    private String token;

    @Column(name = "device_id")
    private String deviceId;

    public Identity(String token, String deviceId) {
        this.token = token;
        this.deviceId = deviceId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
