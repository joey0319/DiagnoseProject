package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.DiagnoseRegisterDto;
import com.ssafy.meongnyang.api.response.DiagnoseListResponseDto;
import com.ssafy.meongnyang.api.response.DiagnoseResponseDto;
import com.ssafy.meongnyang.common.exception.AccessDeniedException;
import com.ssafy.meongnyang.common.exception.DiagnoseNotFoundException;
import com.ssafy.meongnyang.common.exception.UserNotFoundException;
import com.ssafy.meongnyang.common.util.TokenProvider;
import com.ssafy.meongnyang.db.entity.Diagnose;
import com.ssafy.meongnyang.db.entity.User;
import com.ssafy.meongnyang.db.repository.DiagnoseRepository;
import com.ssafy.meongnyang.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class DiagnoseServiceImpl implements DiagnoseService {
    private final DiagnoseRepository diagnoseRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    @Override
    public DiagnoseResponseDto writeDiagnose(String accessToken, DiagnoseRegisterDto diagnoseRegisterDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        Diagnose diagnose = Diagnose.builder()
                .name(diagnoseRegisterDto.getName())
                .user(user)
                .img_url(diagnoseRegisterDto.getImg_url())
                .disease_name1(diagnoseRegisterDto.getDisease_name1())
                .probability1(diagnoseRegisterDto.getProbability1())
                .disease_name2(diagnoseRegisterDto.getDisease_name2())
                .probability2(diagnoseRegisterDto.getProbability2())
                .disease_name3(diagnoseRegisterDto.getDisease_name3())
                .probability3(diagnoseRegisterDto.getProbability3())
                .build();


        Diagnose diagnoseResponse = diagnoseRepository.save(diagnose);

        DiagnoseResponseDto diagnoseResponseDto = DiagnoseResponseDto.builder()
                .id(diagnoseResponse.getId())
                .name(diagnoseResponse.getName())
                .user_name(diagnoseResponse.getUser().getName())
                .disease_name1(diagnoseResponse.getDisease_name1())
                .probability1(diagnoseResponse.getProbability1())
                .disease_name2(diagnoseResponse.getDisease_name2())
                .probability2(diagnoseResponse.getProbability2())
                .disease_name3(diagnoseResponse.getDisease_name3())
                .probability3(diagnoseResponse.getProbability3())
                .img_url(diagnoseResponse.getImg_url())
                .build();

        return diagnoseResponseDto;
    }

    @Override
    public boolean deleteDiagnose(String accessToken, long id) {
        String uid = tokenProvider.getUserId(accessToken);
        Diagnose diagnose = diagnoseRepository.findById(id).orElseThrow(DiagnoseNotFoundException::new);

        if (Long.parseLong(uid) != diagnose.getUser().getId()) {
            throw new AccessDeniedException();
        }

        diagnoseRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DiagnoseListResponseDto> getDiagnoseList(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        List<DiagnoseListResponseDto> list = user.getDiagnoseList()
                .stream()
                .map(diagnose -> DiagnoseListResponseDto.builder()
                        .id(diagnose.getId())
                        .date(diagnose.getDate())
                        .name(diagnose.getName())
                        .disease_name(diagnose.getDisease_name1())
                        .build())
                .sorted((o1, o2) -> o2.getDate().compareTo(o1.getDate()))
                .collect(Collectors.toList());
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public DiagnoseResponseDto getDiagnose(String accessToken, long id) {
        String uid = tokenProvider.getUserId(accessToken);
        Diagnose diagnose = diagnoseRepository.findById(id).orElseThrow(DiagnoseNotFoundException::new);

        if (Long.parseLong(uid) != diagnose.getUser().getId()) {
            throw new AccessDeniedException();
        }

        return DiagnoseResponseDto.builder()
                .id(diagnose.getId())
                .name(diagnose.getName())
                .user_name(diagnose.getUser().getName())
                .img_url(diagnose.getImg_url())
                .disease_name1(diagnose.getDisease_name1())
                .probability1(diagnose.getProbability1())
                .disease_name2(diagnose.getDisease_name2())
                .probability2(diagnose.getProbability2())
                .disease_name3(diagnose.getDisease_name3())
                .probability3(diagnose.getProbability3())
                .build();
    }
}
