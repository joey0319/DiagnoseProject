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
public class LostResponseDto {
    private Long id;
    private String title;
    private Long user_id;
    private String user_nickname;
    private Integer gender;
    private String lost_date;
    private String age;
    private String weight;
    private String kind;
    private String place;
    private String phone;
    private String pay;
    private String etc;
    private Boolean is_found;
    private String name;
    private Timestamp date;
    private List<LostImgResponseDto> imgs;
}
