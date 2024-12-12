package com.example.loginauthapi.controllers;

import com.example.loginauthapi.domain.user.User;
import com.example.loginauthapi.dto.UserDetails;
import com.example.loginauthapi.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UsuarioService usuarioService;


    public UserController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/user-details")
    public ResponseEntity<UserDetails> getUserDetails(@RequestParam String email){
        System.out.println("Email: " + email);

        User usuario = usuarioService.getUser(email);
        UserDetails userDetails = new UserDetails(usuario.getName(), usuario.getEmail());

        return ResponseEntity.ok(userDetails);
    }
}
