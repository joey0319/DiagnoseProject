package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.IsFoundUpdateDto;
import com.ssafy.meongnyang.api.request.LostRegisterDto;
import com.ssafy.meongnyang.api.request.LostUpdateDto;
import com.ssafy.meongnyang.api.response.LostResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LostService {
    LostResponseDto writeLost(String accessToken, LostRegisterDto lostRegisterDto);
    LostResponseDto updateLost(String accessToken, LostUpdateDto lostUpdateDto);
    LostResponseDto updateIsFound(String accessToken, IsFoundUpdateDto isFoundUpdateDto);
    List<LostResponseDto> getLostList();
    boolean deleteLost(String accessToken, long id);
    List<LostResponseDto> getUserLostList(String accessToken);
}
