package com.sbc.payment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PaymentController {

    @GetMapping("/makePayment")
    public void payment(){
        //Nothing to do here
    }
}
