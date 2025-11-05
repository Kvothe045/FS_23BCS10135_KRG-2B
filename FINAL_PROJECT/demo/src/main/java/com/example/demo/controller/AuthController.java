package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        Map<String, String> response = new HashMap<>();

        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            response.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User(
                signupRequest.getUsername(),
                signupRequest.getEmail(),
                signupRequest.getPassword()
        );

        User savedUser = userRepository.save(user);
        response.put("message", "User registered successfully");
        response.put("userId", savedUser.getId().toString());
        response.put("username", savedUser.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
        
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(error);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("userId", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        
        return ResponseEntity.ok(response);
    }
}
