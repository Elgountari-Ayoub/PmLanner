package com.pm.backend.services.interfaces;

import com.pm.backend.dao.request.SignUpRequest;
import com.pm.backend.dao.request.SigninRequest;
import com.pm.backend.dao.response.JwtAuthenticationResponse;


public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}
