package com.ssafy.meongnyang.api.controller;

import com.ssafy.meongnyang.api.request.DiagnoseRegisterDto;
import com.ssafy.meongnyang.api.service.DiagnoseService;
import com.ssafy.meongnyang.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diagnose")
public class DiagnoseController {

    private final DiagnoseService diagnoseService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "진단 내역 등록", notes = "진단 내역을 등록한다.")
    public Response<?> writeDiagnose(@RequestHeader("authorization") String authorization, @RequestBody DiagnoseRegisterDto diagnoseRegisterDto) {
        return new Response<>(true, 201, "진단 내역 등록 성공",
                diagnoseService.writeDiagnose(authorization.replace("Bearer ", ""), diagnoseRegisterDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    @ApiOperation(value = "진단 내역 상세 조회", notes = "해당 id의 진단 내역을 상세 조회한다.")
    public Response<?> getDiagnose(@RequestHeader("authorization") String authorization, @PathVariable long id) {
        return new Response<>(true, 200, "진단 내역 상세 조회 성공",
                diagnoseService.getDiagnose(authorization.replace("Bearer ", ""), id));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    @ApiOperation(value = "진단 내역 삭제", notes = "해당 id의 진단 내역을 삭제한다.")
    public Response<?> deleteDiagnose(@RequestHeader("authorization") String authorization, @PathVariable long id) {
        return new Response<>(true, 200, "진단 내역 삭제 성공",
                diagnoseService.deleteDiagnose(authorization.replace("Bearer ", ""), id));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list")
    @ApiOperation(value = "회원별 진단 내역 목록 조회", notes = "해당하는 회원의 진단 내역을 조회한다.")
    public Response<?> getDiagnoseList(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원별 진단 내역 목록 조회 성공",
                diagnoseService.getDiagnoseList(authorization.replace("Bearer ", "")));
    }
}
