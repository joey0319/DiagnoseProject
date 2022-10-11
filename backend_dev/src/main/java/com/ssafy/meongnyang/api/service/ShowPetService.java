package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.ShowPetRegisterDto;
import com.ssafy.meongnyang.api.request.ShowPetUpdateDto;
import com.ssafy.meongnyang.api.response.ShowPetDetailResponseDto;
import com.ssafy.meongnyang.api.response.ShowPetListResponseDto;
import com.ssafy.meongnyang.api.response.ShowPetResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShowPetService {
    ShowPetResponseDto writeShowPet(String accessToken, ShowPetRegisterDto showPetRegisterDto);
    ShowPetResponseDto updateShowPet(String accessToken, ShowPetUpdateDto showPetUpdateDto);
    List<ShowPetListResponseDto> getShowPetList();
    ShowPetDetailResponseDto getShowPet(Long id);
    boolean deleteShowPet(String accessToken, long id);
    List<ShowPetListResponseDto> getUserShowPetList(String accessToken);
}
