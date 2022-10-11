package com.ssafy.meongnyang.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiagnoseResponseDto {
    private Long id;
    private String user_name;
    private String name;
    private String img_url;
    private String disease_name1;
    private String probability1;
    private String disease_name2;
    private String probability2;
    private String disease_name3;
    private String probability3;
}
