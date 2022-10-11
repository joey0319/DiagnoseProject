package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.UserRegisterDto;
import com.ssafy.meongnyang.api.request.UserUpdateDto;
import com.ssafy.meongnyang.api.response.TokenResponseDto;
import com.ssafy.meongnyang.api.response.UserDetailResponseDto;
import com.ssafy.meongnyang.api.response.UserResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserService {
//    UserResponseDto writeUser(String accessToken, UserRegisterDto userRegisterDto);
    UserResponseDto updateUser(String accessToken, UserUpdateDto userUpdateDto);
    UserDetailResponseDto getUserDetail(String accessToken);
    boolean deleteUser(String accessToken);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    UserResponseDto userInfoByToken(String accessToken);
    void logout(String accessToken);
}
