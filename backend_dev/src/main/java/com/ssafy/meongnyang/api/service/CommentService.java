package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.CommentRegisterDto;
import com.ssafy.meongnyang.api.request.CommentUpdateDto;
import com.ssafy.meongnyang.api.response.CommentResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    CommentResponseDto writeComment(String accessToken, CommentRegisterDto commentRegisterDto);
    CommentResponseDto updateComment(String accessToken, CommentUpdateDto commentUpdateDto);
    List<CommentResponseDto> getCommentList(long id);
    boolean deleteComment(String accessToken, long id);
}
