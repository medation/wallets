package com.sbc.projet.controller;

import com.sbc.projet.model.Identity;
import com.sbc.projet.service.implement.CheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class ProjetController{

    @Autowired
    public CheckService checkService;

    @GetMapping("/checkDevice")
    @CrossOrigin
    public String checkDevice() {
        return checkService.checkTokenForUser("1");
    }

    @PostMapping("/addToken")
    public void addToken(@Valid @RequestBody Identity identity) {
        checkService.saveToken(identity);
    }
}
