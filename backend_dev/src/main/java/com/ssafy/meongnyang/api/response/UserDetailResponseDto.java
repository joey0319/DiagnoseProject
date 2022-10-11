package com.ssafy.meongnyang.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetailResponseDto {
    private Long id;
    private String name;
    private String nickname;
    private String email;
    private Timestamp join_date;
    private String profile_img;
    private List<LostResponseDto> lostList;
    private List<ShowPetListResponseDto> showPetList;
    private List<DiagnoseListResponseDto> diagnoseList;
}
