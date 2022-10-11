package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.UserUpdateDto;
import com.ssafy.meongnyang.api.response.*;
import com.ssafy.meongnyang.common.exception.UserNotFoundException;
import com.ssafy.meongnyang.common.util.RedisService;
import com.ssafy.meongnyang.common.util.TokenProvider;
import com.ssafy.meongnyang.db.entity.User;
import com.ssafy.meongnyang.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final TokenProvider tokenProvider;

    private final RedisService redisService;

    @Override
    public UserResponseDto updateUser(String accessToken, UserUpdateDto userUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        user.updateUser(userUpdateDto);

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile_img(user.getProfile_img())
                .join_date(user.getJoin_date())
                .build();
        return userResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailResponseDto getUserDetail(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);
        List<LostResponseDto> lostList = user.getLostList()
                .stream()
                .map(lost -> LostResponseDto.builder()
                        .id(lost.getId())
                        .user_nickname(lost.getUser().getName())
                        .title(lost.getTitle())
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
                                        .lost_id(lostImg.getLost().getId())
                                        .id(lostImg.getId())
                                        .img_url(lostImg.getImg_url())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        List<ShowPetListResponseDto> showPetList = user.getShowPetList()
                .stream()
                .map(showPet -> ShowPetListResponseDto.builder()
                        .id(showPet.getId())
                        .title(showPet.getTitle())
                        .user_nickname(showPet.getUser().getName())
                        .date(showPet.getDate())
                        .build())
                .collect(Collectors.toList());

        List<DiagnoseListResponseDto> diagnoseList = user.getDiagnoseList()
                .stream()
                .map(diagnose -> DiagnoseListResponseDto.builder()
                        .id(diagnose.getId())
                        .date(diagnose.getDate())
                        .name(diagnose.getName())
                        .disease_name(diagnose.getDisease_name1())
                        .build())
                .collect(Collectors.toList());

        UserDetailResponseDto userDetailResponseDto = UserDetailResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .join_date(user.getJoin_date())
                .profile_img(user.getProfile_img())
                .lostList(lostList)
                .showPetList(showPetList)
                .diagnoseList(diagnoseList)
                .build();
        return userDetailResponseDto;
    }

    @Override
    public boolean deleteUser(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(Long.parseLong(uid));
        redisService.deleteValues(uid);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public TokenResponseDto reIssue(String accessToken, String refreshToken) {
        tokenProvider.validateToken(refreshToken);
        String uid = tokenProvider.getUserId(refreshToken);
        String findRefreshToken = redisService.getValue(uid);

        if (findRefreshToken == null || !findRefreshToken.equals(refreshToken)) {
            throw new UserNotFoundException("refreshToken을 찾을 수 없습니다.");
        } else {
            return TokenResponseDto.builder()
                    .accessToken(tokenProvider.createAccessToken(uid))
                    .build();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto userInfoByToken(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        User user = userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없습니다."));

        return UserResponseDto.builder()
                .id(Long.parseLong(uid))
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .join_date(user.getJoin_date())
                .profile_img(user.getProfile_img())
                .build();
    }

    @Override
    public void logout(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없습니다."));
        redisService.deleteValues(uid);
    }
}
