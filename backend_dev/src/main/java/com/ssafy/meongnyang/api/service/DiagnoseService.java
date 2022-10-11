package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.DiagnoseRegisterDto;
import com.ssafy.meongnyang.api.response.DiagnoseListResponseDto;
import com.ssafy.meongnyang.api.response.DiagnoseResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiagnoseService {
    DiagnoseResponseDto writeDiagnose(String accessToken, DiagnoseRegisterDto diagnoseRegisterDto);
    boolean deleteDiagnose(String accessToken, long id);
    List<DiagnoseListResponseDto> getDiagnoseList(String accessToken);
    DiagnoseResponseDto getDiagnose(String accessToken, long id);
}
