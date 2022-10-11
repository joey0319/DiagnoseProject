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
public class DiagnoseListResponseDto {
    private Long id;
    private Timestamp date;
    private String name;    //반려동물명
    private String disease_name;
}
