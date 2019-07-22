package com.sbc.authentication.config;

import com.sbc.authentication.model.Role;
import com.sbc.authentication.model.User;
import com.sbc.authentication.repository.RoleRepository;
import com.sbc.authentication.repository.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Component
public class FakeData implements ApplicationRunner {

    @Autowired
    public RoleRepository roleRepository;

    @Autowired
    public UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        makeFakeData();
    }

    public void makeFakeData(){
        Role user = new Role(1,"USER");
        if(!roleRepository.findById(1).isPresent())
            roleRepository.save(user);
        Role admin = new Role(2,"ADMIN");
        if(!roleRepository.findById(2).isPresent())
            roleRepository.save(admin);

        int increment = userRepository.findAll().size();
        User userTest = new User("Mohamed"+increment,"Elhachimi"+increment,"user"+increment,"pass"+increment,"test@mail.com"+increment);
        userTest.encodePassword(new BCryptPasswordEncoder(12));
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findById(1).get());
        roles.add(roleRepository.findById(2).get());
        userTest.setRoles(roles);
        userRepository.save(userTest);
    }
}