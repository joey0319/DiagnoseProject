package com.ssafy.meongnyang.api.controller;

import com.ssafy.meongnyang.api.request.CommentRegisterDto;
import com.ssafy.meongnyang.api.request.CommentUpdateDto;
import com.ssafy.meongnyang.api.service.CommentService;
import com.ssafy.meongnyang.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/show-pet/comment")
public class CommentController {
    private final CommentService commentService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "댓글 등록", notes = "반려동물 자랑 글에 댓글을 등록한다.")
    public Response<?> writeComment(@RequestHeader("authorization") String authorization, @RequestBody CommentRegisterDto commentRegisterDto) {
        return new Response<>(true, 201, "댓글 등록 성공",
                commentService.writeComment(authorization.replace("Bearer ", ""), commentRegisterDto));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "댓글 수정", notes = "반려동물 자랑 글의 댓글을 수정한다.")
    public Response<?> updateComment(@RequestHeader("authorization") String authorization, @RequestBody CommentUpdateDto commentUpdateDto) {
        return new Response<>(true, 202, "댓글 수정 성공",
                commentService.updateComment(authorization.replace("Bearer ", ""), commentUpdateDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    @ApiOperation(value = "댓글 삭제", notes = "해당 id의 댓글을 삭제한다.")
    public Response<?> deleteComment(@RequestHeader("authorization") String authorization, @PathVariable long id) {
        return new Response<>(true, 200, "댓글 삭제 성공",
                commentService.deleteComment(authorization.replace("Bearer ", ""), id));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list/{id}")
    @ApiOperation(value = "댓글 목록 조회", notes = "해당 id의 반려동물 자랑 글에 달린 댓글 목록을 반환한다.")
    public Response<?> getCommentList(@PathVariable long id) {
        return new Response<>(true, 200, "댓글 목록 조회 성공",
                commentService.getCommentList(id));
    }
}
