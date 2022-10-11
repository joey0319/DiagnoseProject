package com.ssafy.meongnyang.api.request;

import com.ssafy.meongnyang.api.response.LostImgResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LostRegisterDto {
    private String title;
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
    private List<String> imgs;
}
