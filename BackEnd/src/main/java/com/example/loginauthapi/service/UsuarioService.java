package com.example.loginauthapi.service;

import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UserRepository repository;

    public UsuarioService(UserRepository repository) {
        this.repository = repository;
    }




    public User getUser(String email){
       return  repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
