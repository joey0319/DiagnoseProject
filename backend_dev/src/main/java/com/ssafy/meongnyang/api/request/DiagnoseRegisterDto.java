package com.ssafy.meongnyang.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiagnoseRegisterDto {
    private String name;
    private String img_url;
    private String disease_name1;
    private String probability1;

    private String disease_name2;
    private String probability2;

    private String disease_name3;
    private String probability3;
}
