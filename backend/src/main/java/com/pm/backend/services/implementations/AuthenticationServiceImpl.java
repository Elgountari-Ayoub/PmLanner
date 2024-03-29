package com.pm.backend.services.implementations;


import com.pm.backend.dao.request.SignUpRequest;
import com.pm.backend.dao.request.SigninRequest;
import com.pm.backend.dao.response.JwtAuthenticationResponse;
import com.pm.backend.entities.User;
import com.pm.backend.repositories.UserRepository;
import com.pm.backend.services.interfaces.AuthenticationService;
import com.pm.backend.services.interfaces.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        var user = User.builder().name(request.getName())
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        System.out.println(jwt);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        System.out.println(jwt);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}
