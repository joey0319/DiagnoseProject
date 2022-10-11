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
public class ShowPetResponseDto {
    private Long id;
    private String title;
    private String user_nickname;
    private String name;
    private String content;
    private Timestamp date;
    private List<ShowPetImgResponseDto> imgs;
}
