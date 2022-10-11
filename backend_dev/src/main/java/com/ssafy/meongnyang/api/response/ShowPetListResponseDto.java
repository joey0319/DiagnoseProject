package com.ssafy.meongnyang.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowPetListResponseDto {
    private Long id;
    private String title;
    private String user_nickname;
    private String list_img;
    private Timestamp date;
}
