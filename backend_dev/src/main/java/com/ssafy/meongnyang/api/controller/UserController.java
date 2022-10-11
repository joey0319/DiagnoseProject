package com.ssafy.meongnyang.api.controller;

import com.ssafy.meongnyang.api.request.UserUpdateDto;
import com.ssafy.meongnyang.api.service.UserService;
import com.ssafy.meongnyang.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @ApiOperation(value = "회원정보 조회", notes = "회원 정보를 조회한다.")
    public Response<?> getUserDetail(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원 정보 조회 성공", userService.getUserDetail(authorization.replace("Bearer ", "")));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "회원정보 수정", notes = "회원 정보를 수정한다.")
    public Response<?> updateUser(@RequestHeader("authorization") String authorization, @RequestBody UserUpdateDto userUpdateDto) {
        return new Response<>(true, 202, "회원 정보 수정 성공", userService.updateUser(authorization.replace("Bearer ", ""), userUpdateDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping
    @ApiOperation(value = "회원탈퇴", notes = "해당 회원 정보를 삭제한다.")
    public Response<?> deleteUser(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원 탈퇴 성공", userService.deleteUser(authorization.replace("Bearer ", "")));
    }
}
