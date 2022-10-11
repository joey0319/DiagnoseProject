package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.IsFoundUpdateDto;
import com.ssafy.meongnyang.api.request.LostRegisterDto;
import com.ssafy.meongnyang.api.request.LostUpdateDto;
import com.ssafy.meongnyang.api.response.LostImgResponseDto;
import com.ssafy.meongnyang.api.response.LostResponseDto;
import com.ssafy.meongnyang.common.exception.AccessDeniedException;
import com.ssafy.meongnyang.common.exception.LostNotFoundException;
import com.ssafy.meongnyang.common.exception.UserNotFoundException;
import com.ssafy.meongnyang.common.util.TokenProvider;
import com.ssafy.meongnyang.db.entity.Lost;
import com.ssafy.meongnyang.db.entity.LostImg;
import com.ssafy.meongnyang.db.entity.User;
import com.ssafy.meongnyang.db.repository.LostImgRepository;
import com.ssafy.meongnyang.db.repository.LostRepository;
import com.ssafy.meongnyang.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Transactional
@Service
@RequiredArgsConstructor
public class LostServiceImpl implements LostService {
    private final LostRepository lostRepository;
    private final LostImgRepository lostImgRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    @Override
    public LostResponseDto writeLost(String accessToken, LostRegisterDto lostRegisterDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        Lost lost = Lost.builder()
                .user(user)
                .lost_date(lostRegisterDto.getLost_date())
                .age(lostRegisterDto.getAge())
                .gender(lostRegisterDto.getGender())
                .etc(lostRegisterDto.getEtc())
                .kind(lostRegisterDto.getKind())
                .title(lostRegisterDto.getTitle())
                .weight(lostRegisterDto.getWeight())
                .place(lostRegisterDto.getPlace())
                .name(lostRegisterDto.getName())
                .pay(lostRegisterDto.getPay())
                .phone(lostRegisterDto.getPhone())
                .is_found(lostRegisterDto.getIs_found())
                .lostImgList(new ArrayList<>())
                .build();

        Lost lostResponse = lostRepository.save(lost);
        List<LostImg> imgList = lostImgRepository.saveAll(lostRegisterDto.getImgs()
                .stream()
                .map(s -> LostImg.builder()
                        .img_url(s)
                        .lost(lost)
                        .build()).collect(Collectors.toList()));

        LostResponseDto lostResponseDto = LostResponseDto.builder()
                .id(lostResponse.getId())
                .title(lostResponse.getTitle())
                .user_id(lostResponse.getUser().getId())
                .user_nickname(lostResponse.getUser().getNickname())
                .gender(lostResponse.getGender())
                .lost_date(lostResponse.getLost_date())
                .age(lostResponse.getAge())
                .weight(lostResponse.getWeight())
                .kind(lostResponse.getKind())
                .place(lostResponse.getPlace())
                .phone(lostResponse.getPhone())
                .pay(lostResponse.getPay())
                .etc(lostResponse.getEtc())
                .is_found(lostResponse.getIs_found())
                .name(lostResponse.getName())
                .date(lostResponse.getDate())
                .imgs(imgList
                        .stream()
                        .map(lostImg -> LostImgResponseDto.builder()
                                .id(lostImg.getId())
                                .lost_id(lostImg.getLost().getId())
                                .img_url(lostImg.getImg_url())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        return lostResponseDto;
    }

    @Override
    public LostResponseDto updateLost(String accessToken, LostUpdateDto lostUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        Lost lost = lostRepository.findById(lostUpdateDto.getId()).orElseThrow(LostNotFoundException::new);

        if (Long.parseLong(uid) != lost.getUser().getId()) {
            throw new AccessDeniedException();
        }
        lostImgRepository.deleteAllByLostId(lost.getId());

        lost.updateLost(lostUpdateDto);
        List<LostImg> imgList = lostImgRepository.saveAll(lostUpdateDto.getImgs()
                .stream()
                .map(s -> LostImg.builder()
                        .img_url(s)
                        .lost(lost)
                        .build()).collect(Collectors.toList()));

        LostResponseDto lostResponseDto = LostResponseDto.builder()
                .id(lost.getId())
                .title(lost.getTitle())
                .user_id(lost.getUser().getId())
                .user_nickname(lost.getUser().getNickname())
                .gender(lost.getGender())
                .lost_date(lost.getLost_date())
                .age(lost.getAge())
                .weight(lost.getWeight())
                .kind(lost.getKind())
                .place(lost.getPlace())
                .phone(lost.getPhone())
                .pay(lost.getPay())
                .etc(lost.getEtc())
                .is_found(lost.getIs_found())
                .name(lost.getName())
                .date(lost.getDate())
                .imgs(imgList
                        .stream()
                        .map(lostImg -> LostImgResponseDto.builder()
                                .id(lostImg.getId())
                                .lost_id(lostImg.getLost().getId())
                                .img_url(lostImg.getImg_url())
                                .build())
                        .collect(Collectors.toList()))
                .build();
        return lostResponseDto;
    }

    @Override
    public LostResponseDto updateIsFound(String accessToken, IsFoundUpdateDto isFoundUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        Lost lost = lostRepository.findById(isFoundUpdateDto.getId()).orElseThrow(LostNotFoundException::new);

        if (Long.parseLong(uid) != lost.getUser().getId()) {
            throw new AccessDeniedException();
        }

        lost.updateIsFound(isFoundUpdateDto.getIs_found());

        LostResponseDto lostResponseDto = LostResponseDto.builder()
                .id(lost.getId())
                .title(lost.getTitle())
                .user_id(lost.getUser().getId())
                .user_nickname(lost.getUser().getNickname())
                .gender(lost.getGender())
                .lost_date(lost.getLost_date())
                .age(lost.getAge())
                .weight(lost.getWeight())
                .kind(lost.getKind())
                .place(lost.getPlace())
                .phone(lost.getPhone())
                .pay(lost.getPay())
                .etc(lost.getEtc())
                .is_found(lost.getIs_found())
                .name(lost.getName())
                .date(lost.getDate())
                .imgs(lost.getLostImgList()
                        .stream()
                        .map(lostImg -> LostImgResponseDto.builder()
                                .id(lostImg.getId())
                                .lost_id(lostImg.getLost().getId())
                                .img_url(lostImg.getImg_url())
                                .build())
                        .collect(Collectors.toList()))
                .build();
        return lostResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LostResponseDto> getLostList() {

        return lostRepository.findAllWithSorting()
                .stream()
                .map(LostServiceImpl::apply)
                .collect(Collectors.toList());
//                .stream()
//                .map(lost -> LostResponseDto.builder()
//                        .id(lost.getId())
//                        .age(lost.getAge())
//                        .etc(lost.getEtc())
//                        .gender(lost.getGender())
//                        .kind(lost.getKind())
//                        .pay(lost.getPay())
//                        .lost_date(lost.getLost_date())
//                        .weight(lost.getWeight())
//                        .phone(lost.getPhone())
//                        .is_found(lost.getIs_found())
//                        .title(lost.getTitle())
//                        .date(lost.getDate())
//                        .name(lost.getName())
//                        .imgs(lost.getLostImgList()
//                                .stream()
//                                .map(lostImg -> LostImgResponseDto.builder()
//                                        .img_url(lostImg.getImg_url())
//                                        .lost_id(lostImg.getLost().getId())
//                                        .id(lostImg.getId())
//                                        .build())
//                                .collect(Collectors.toList()))
//                        .build())
//                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteLost(String accessToken, long id) {
        String uid = tokenProvider.getUserId(accessToken);
        Lost lost = lostRepository.findById(id).orElseThrow(LostNotFoundException::new);

        if (Long.parseLong(uid) != lost.getUser().getId()) {
            throw new AccessDeniedException();
        }
        lostRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LostResponseDto> getUserLostList(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        return lostRepository.findAllByUserId(Long.parseLong(uid))
                .stream()
                .map(LostServiceImpl::apply)
                .collect(Collectors.toList());
    }

    private static LostResponseDto apply(Lost lost) {
        return LostResponseDto.builder()
                .id(lost.getId())
                .age(lost.getAge())
                .etc(lost.getEtc())
                .gender(lost.getGender())
                .kind(lost.getKind())
                .pay(lost.getPay())
                .lost_date(lost.getLost_date())
                .weight(lost.getWeight())
                .phone(lost.getPhone())
                .is_found(lost.getIs_found())
                .title(lost.getTitle())
                .date(lost.getDate())
                .name(lost.getName())
                .place(lost.getPlace())
                .user_id(lost.getUser().getId())
                .user_nickname(lost.getUser().getNickname())
                .imgs(lost.getLostImgList()
                        .stream()
                        .map(lostImg -> LostImgResponseDto.builder()
                                .img_url(lostImg.getImg_url())
                                .lost_id(lostImg.getLost().getId())
                                .id(lostImg.getId())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
