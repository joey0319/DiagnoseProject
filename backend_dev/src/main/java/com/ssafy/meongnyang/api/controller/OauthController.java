package com.ssafy.meongnyang.api.controller;

import com.ssafy.meongnyang.api.response.TokenResponseDto;
import com.ssafy.meongnyang.api.response.UserResponseDto;
import com.ssafy.meongnyang.api.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OauthController {
    private final UserServiceImpl userService;

    @GetMapping("/test")
    public ResponseEntity<String> test(@RequestParam String accessToken, @RequestParam String refreshToken) {
        return new ResponseEntity<>(accessToken + "\n" + refreshToken, HttpStatus.OK);
    }

    @Operation(summary = "health_check", description = "API connect test")
    @GetMapping("/health_check")
    public String health_check() {
        return "health_check";
    }


    @GetMapping("/token_check")
    public String token_check() {
        return "token_check";
    }

    @GetMapping("/token/reissuance/{refreshToken}")
    public ResponseEntity<TokenResponseDto> reIssue(@RequestHeader("authorization") String authorization,
                                                    @PathVariable String refreshToken) {
        return new ResponseEntity<>(userService.reIssue(authorization.replace("Bearer ", ""),
                refreshToken), HttpStatus.CREATED);
    }

    @GetMapping("/users/info")
    public ResponseEntity<UserResponseDto> userInfo(@RequestHeader("authorization") String authorization) {
        return new ResponseEntity<>(userService.userInfoByToken(authorization.replace("Bearer ", "")),
                HttpStatus.CREATED);
    }
}
