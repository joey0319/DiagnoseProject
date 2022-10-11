package com.ssafy.meongnyang.api.controller;

import com.ssafy.meongnyang.api.request.ShowPetRegisterDto;
import com.ssafy.meongnyang.api.request.ShowPetUpdateDto;
import com.ssafy.meongnyang.api.service.ShowPetService;
import com.ssafy.meongnyang.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/show-pet")
public class ShowPetController {

    private final ShowPetService showPetService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "반려동물 자랑 글 등록", notes = "반려동물 자랑 글을 등록한다.")
    public Response<?> writeShowPet(@RequestHeader("authorization") String authorization, @RequestBody ShowPetRegisterDto showPetRegisterDto) {
        return new Response<>(true, 201, "자랑 글 등록 성공",
                showPetService.writeShowPet(authorization.replace("Bearer ", ""), showPetRegisterDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list")
    @ApiOperation(value = "반려동물 자랑 글 목록 조회", notes = "등록된 모든 반려동물 자랑 글의 목록을 반환한다.")
    public Response<?> getShowPetList() {
        return new Response<>(true, 200, "자랑 글 목록 조회 성공",
                showPetService.getShowPetList());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    @ApiOperation(value = "반려동물 자랑 글 상세 조회", notes = "id에 해당하는 반려동물 자랑 글의 상세 정보를 반환한다.")
    public Response<?> getShowPet(@PathVariable long id) {
        return new Response<>(true, 200, "자랑 글 상세 조회 성공",
                showPetService.getShowPet(id));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "반려동물 자랑 글 수정", notes = "반려동물 자랑 글을 수정한다.")
    public Response<?> updateShowPet(@RequestHeader("authorization") String authorization, @RequestBody ShowPetUpdateDto showPetUpdateDto) {
        return new Response<>(true, 202, "자랑 글 수정 성공",
                showPetService.updateShowPet(authorization.replace("Bearer ", ""), showPetUpdateDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    @ApiOperation(value = "반려동물 자랑 글 삭제", notes = "id에 해당하는 반려동물 자랑 글을 삭제한다.")
    public Response<?> deleteShowPet(@RequestHeader("authorization") String authorization, @PathVariable long id) {
        return new Response<>(true, 200, "자랑 글 삭제 성공",
                showPetService.deleteShowPet(authorization.replace("Bearer ", ""), id));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/articles")
    @ApiOperation(value = "회원별 반려동물 자랑 글 목록 조회", notes = "해당하는 회원의 반려동물 자랑 글 목록을 반환한다.")
    public Response<?> getUserShowPetList(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원별 자랑 글 목록 조회 성공",
                showPetService.getUserShowPetList(authorization.replace("Bearer ", "")));
    }
}
